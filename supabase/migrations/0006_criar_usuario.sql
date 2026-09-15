-- =====================================================================
-- Newchamps Gestor — 0006 função para o admin criar usuários da equipe pela tela
-- Cria o login (auth.users + identity) e o perfil (public.users) numa tacada só.
-- Protegida: só quem é admin da organização pode chamar.
-- =====================================================================

create or replace function criar_usuario_equipe(
  p_email text,
  p_nome text,
  p_papel text,
  p_senha text
) returns uuid
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  v_org uuid;
  v_uid uuid := gen_random_uuid();
  v_email text := lower(trim(p_email));
begin
  if not is_admin() then
    raise exception 'Apenas administradores podem criar usuários';
  end if;
  v_org := current_org_id();
  if v_org is null then
    raise exception 'Organização não encontrada para o usuário atual';
  end if;
  if p_papel not in ('admin', 'colaborador') then
    raise exception 'Papel inválido (use admin ou colaborador)';
  end if;
  if v_email is null or v_email = '' or position('@' in v_email) = 0 then
    raise exception 'E-mail inválido';
  end if;
  if coalesce(trim(p_nome), '') = '' then
    raise exception 'Informe o nome';
  end if;
  if length(coalesce(p_senha, '')) < 6 then
    raise exception 'A senha precisa de ao menos 6 caracteres';
  end if;
  if exists (select 1 from auth.users where email = v_email) then
    raise exception 'Já existe um usuário com esse e-mail';
  end if;

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    '00000000-0000-0000-0000-000000000000', v_uid, 'authenticated', 'authenticated',
    v_email, crypt(p_senha, gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}', jsonb_build_object('nome', p_nome),
    '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(), v_uid, v_uid::text,
    jsonb_build_object('sub', v_uid::text, 'email', v_email, 'email_verified', true),
    'email', now(), now(), now()
  );

  insert into public.users (id, organization_id, email, nome, papel)
  values (v_uid, v_org, v_email, trim(p_nome), p_papel);

  return v_uid;
end $$;

revoke execute on function criar_usuario_equipe(text, text, text, text) from anon, public;
grant execute on function criar_usuario_equipe(text, text, text, text) to authenticated;
