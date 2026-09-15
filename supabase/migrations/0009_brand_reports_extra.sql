-- =====================================================================
-- Newchamps Gestor — 0009 campos extras da Priorização de Entrada (Nubmetrics)
-- Para a tela ficar idêntica à aba "Priorização de Entrada" da planilha.
-- =====================================================================
alter table brand_reports add column if not exists saturacao text;
alter table brand_reports add column if not exists tendencia text;
alter table brand_reports add column if not exists pct_catalogo numeric;
