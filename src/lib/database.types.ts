// Tipos gerados do banco Supabase (projeto newchamps-gestor).
// NÃO editar à mão — regerar com o MCP generate_typescript_types.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      agent_learnings: {
        Row: {
          agente_id: string | null
          criado_em: string
          evidencia_ref: string | null
          id: string
          organization_id: string | null
          revisado_em: string | null
          revisado_por: string | null
          status: string
          texto: string
          tipo: string | null
        }
        Insert: {
          agente_id?: string | null
          criado_em?: string
          evidencia_ref?: string | null
          id?: string
          organization_id?: string | null
          revisado_em?: string | null
          revisado_por?: string | null
          status?: string
          texto: string
          tipo?: string | null
        }
        Update: {
          agente_id?: string | null
          criado_em?: string
          evidencia_ref?: string | null
          id?: string
          organization_id?: string | null
          revisado_em?: string | null
          revisado_por?: string | null
          status?: string
          texto?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_learnings_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_learnings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_learnings_revisado_por_fkey"
            columns: ["revisado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_messages: {
        Row: {
          assunto: string | null
          corpo: string | null
          criado_em: string
          de_agente_id: string | null
          id: string
          lido: boolean
          para_agente_id: string | null
          payload_json: Json | null
        }
        Insert: {
          assunto?: string | null
          corpo?: string | null
          criado_em?: string
          de_agente_id?: string | null
          id?: string
          lido?: boolean
          para_agente_id?: string | null
          payload_json?: Json | null
        }
        Update: {
          assunto?: string | null
          corpo?: string | null
          criado_em?: string
          de_agente_id?: string | null
          id?: string
          lido?: boolean
          para_agente_id?: string | null
          payload_json?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_messages_de_agente_id_fkey"
            columns: ["de_agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_messages_para_agente_id_fkey"
            columns: ["para_agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_runs: {
        Row: {
          agente_id: string | null
          custo_estimado: number | null
          erro: string | null
          finalizado_em: string | null
          id: string
          iniciado_em: string
          itens_processados: number | null
          status: string
          tokens_entrada: number | null
          tokens_saida: number | null
        }
        Insert: {
          agente_id?: string | null
          custo_estimado?: number | null
          erro?: string | null
          finalizado_em?: string | null
          id?: string
          iniciado_em?: string
          itens_processados?: number | null
          status?: string
          tokens_entrada?: number | null
          tokens_saida?: number | null
        }
        Update: {
          agente_id?: string | null
          custo_estimado?: number | null
          erro?: string | null
          finalizado_em?: string | null
          id?: string
          iniciado_em?: string
          itens_processados?: number | null
          status?: string
          tokens_entrada?: number | null
          tokens_saida?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_runs_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tasks: {
        Row: {
          agente_id: string | null
          chave_idempotencia: string | null
          criado_em: string
          erro: string | null
          executado_em: string | null
          id: string
          origem_agente_id: string | null
          payload_json: Json | null
          proxima_tentativa_em: string | null
          status: string
          tentativas: number
          tipo: string
        }
        Insert: {
          agente_id?: string | null
          chave_idempotencia?: string | null
          criado_em?: string
          erro?: string | null
          executado_em?: string | null
          id?: string
          origem_agente_id?: string | null
          payload_json?: Json | null
          proxima_tentativa_em?: string | null
          status?: string
          tentativas?: number
          tipo: string
        }
        Update: {
          agente_id?: string | null
          chave_idempotencia?: string | null
          criado_em?: string
          erro?: string | null
          executado_em?: string | null
          id?: string
          origem_agente_id?: string | null
          payload_json?: Json | null
          proxima_tentativa_em?: string | null
          status?: string
          tentativas?: number
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_tasks_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_tasks_origem_agente_id_fkey"
            columns: ["origem_agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_tools: {
        Row: {
          ativo: boolean
          categoria: string | null
          descricao: string | null
          id: string
          nome: string
          requer_aprovacao: boolean
          schema_entrada_json: Json | null
          slug: string
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          descricao?: string | null
          id?: string
          nome: string
          requer_aprovacao?: boolean
          schema_entrada_json?: Json | null
          slug: string
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          requer_aprovacao?: boolean
          schema_entrada_json?: Json | null
          slug?: string
        }
        Relationships: []
      }
      agente_ferramentas: {
        Row: {
          agent_tool_id: string
          agente_id: string
        }
        Insert: {
          agent_tool_id: string
          agente_id: string
        }
        Update: {
          agent_tool_id?: string
          agente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agente_ferramentas_agent_tool_id_fkey"
            columns: ["agent_tool_id"]
            isOneToOne: false
            referencedRelation: "agent_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agente_ferramentas_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
        ]
      }
      agente_prompt_versoes: {
        Row: {
          agente_id: string
          criado_em: string
          criado_por: string | null
          id: string
          system_prompt: string
        }
        Insert: {
          agente_id: string
          criado_em?: string
          criado_por?: string | null
          id?: string
          system_prompt: string
        }
        Update: {
          agente_id?: string
          criado_em?: string
          criado_por?: string | null
          id?: string
          system_prompt?: string
        }
        Relationships: [
          {
            foreignKeyName: "agente_prompt_versoes_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agente_prompt_versoes_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      agente_relatorios: {
        Row: {
          agente_id: string | null
          aprendizados_aprovados: number | null
          aprendizados_propostos: number | null
          custo_periodo: number | null
          execucoes: number | null
          falhas: number | null
          id: string
          itens_processados: number | null
          periodo_fim: string
          periodo_inicio: string
          resumo_json: Json | null
          sugestoes_aceitas: number | null
          sugestoes_feitas: number | null
          sugestoes_recusadas: number | null
        }
        Insert: {
          agente_id?: string | null
          aprendizados_aprovados?: number | null
          aprendizados_propostos?: number | null
          custo_periodo?: number | null
          execucoes?: number | null
          falhas?: number | null
          id?: string
          itens_processados?: number | null
          periodo_fim: string
          periodo_inicio: string
          resumo_json?: Json | null
          sugestoes_aceitas?: number | null
          sugestoes_feitas?: number | null
          sugestoes_recusadas?: number | null
        }
        Update: {
          agente_id?: string | null
          aprendizados_aprovados?: number | null
          aprendizados_propostos?: number | null
          custo_periodo?: number | null
          execucoes?: number | null
          falhas?: number | null
          id?: string
          itens_processados?: number | null
          periodo_fim?: string
          periodo_inicio?: string
          resumo_json?: Json | null
          sugestoes_aceitas?: number | null
          sugestoes_feitas?: number | null
          sugestoes_recusadas?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "agente_relatorios_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
        ]
      }
      agentes: {
        Row: {
          ai_provider_id: string | null
          ativo: boolean
          atualizado_em: string
          criado_em: string
          especialidade: string | null
          funcao: string | null
          gatilho_config: string | null
          gatilho_tipo: string
          id: string
          limite_custo_mes_brl: number | null
          limite_execucoes_dia: number | null
          modelo: string | null
          modo_simulacao: boolean
          modulo: string | null
          nivel_autonomia: string
          nome: string
          organization_id: string | null
          slug: string
          system_prompt: string | null
          timeout_segundos: number | null
          tipo: string
        }
        Insert: {
          ai_provider_id?: string | null
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          especialidade?: string | null
          funcao?: string | null
          gatilho_config?: string | null
          gatilho_tipo?: string
          id?: string
          limite_custo_mes_brl?: number | null
          limite_execucoes_dia?: number | null
          modelo?: string | null
          modo_simulacao?: boolean
          modulo?: string | null
          nivel_autonomia?: string
          nome: string
          organization_id?: string | null
          slug: string
          system_prompt?: string | null
          timeout_segundos?: number | null
          tipo: string
        }
        Update: {
          ai_provider_id?: string | null
          ativo?: boolean
          atualizado_em?: string
          criado_em?: string
          especialidade?: string | null
          funcao?: string | null
          gatilho_config?: string | null
          gatilho_tipo?: string
          id?: string
          limite_custo_mes_brl?: number | null
          limite_execucoes_dia?: number | null
          modelo?: string | null
          modo_simulacao?: boolean
          modulo?: string | null
          nivel_autonomia?: string
          nome?: string
          organization_id?: string | null
          slug?: string
          system_prompt?: string | null
          timeout_segundos?: number | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "agentes_ai_provider_id_fkey"
            columns: ["ai_provider_id"]
            isOneToOne: false
            referencedRelation: "ai_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agentes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_providers: {
        Row: {
          ativo: boolean
          criado_em: string
          id: string
          modelo_padrao: string | null
          nome: string
          organization_id: string
          segredo_ref: string | null
          tipo: string
        }
        Insert: {
          ativo?: boolean
          criado_em?: string
          id?: string
          modelo_padrao?: string | null
          nome: string
          organization_id: string
          segredo_ref?: string | null
          tipo: string
        }
        Update: {
          ativo?: boolean
          criado_em?: string
          id?: string
          modelo_padrao?: string | null
          nome?: string
          organization_id?: string
          segredo_ref?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_providers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_rules: {
        Row: {
          alert_type_id: string
          ativo: boolean
          canal: string
          destinatario_user_id: string | null
          horario_silencio: string | null
          id: string
        }
        Insert: {
          alert_type_id: string
          ativo?: boolean
          canal?: string
          destinatario_user_id?: string | null
          horario_silencio?: string | null
          id?: string
        }
        Update: {
          alert_type_id?: string
          ativo?: boolean
          canal?: string
          destinatario_user_id?: string | null
          horario_silencio?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_rules_alert_type_id_fkey"
            columns: ["alert_type_id"]
            isOneToOne: false
            referencedRelation: "alert_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_rules_destinatario_user_id_fkey"
            columns: ["destinatario_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_types: {
        Row: {
          ativo: boolean
          descricao: string | null
          id: string
          modulo_origem: string | null
          nome: string
          organization_id: string
          severidade: string | null
        }
        Insert: {
          ativo?: boolean
          descricao?: string | null
          id?: string
          modulo_origem?: string | null
          nome: string
          organization_id: string
          severidade?: string | null
        }
        Update: {
          ativo?: boolean
          descricao?: string | null
          id?: string
          modulo_origem?: string | null
          nome?: string
          organization_id?: string
          severidade?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_types_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type_id: string | null
          criado_em: string
          descricao: string | null
          id: string
          loja_id: string | null
          organization_id: string
          referencia: string | null
          resolvido_em: string | null
          resolvido_por: string | null
          severidade: string | null
          status: string
          titulo: string
          visto_em: string | null
        }
        Insert: {
          alert_type_id?: string | null
          criado_em?: string
          descricao?: string | null
          id?: string
          loja_id?: string | null
          organization_id: string
          referencia?: string | null
          resolvido_em?: string | null
          resolvido_por?: string | null
          severidade?: string | null
          status?: string
          titulo: string
          visto_em?: string | null
        }
        Update: {
          alert_type_id?: string | null
          criado_em?: string
          descricao?: string | null
          id?: string
          loja_id?: string | null
          organization_id?: string
          referencia?: string | null
          resolvido_em?: string | null
          resolvido_por?: string | null
          severidade?: string | null
          status?: string
          titulo?: string
          visto_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_alert_type_id_fkey"
            columns: ["alert_type_id"]
            isOneToOne: false
            referencedRelation: "alert_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_resolvido_por_fkey"
            columns: ["resolvido_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      api_tokens: {
        Row: {
          criado_em: string
          criado_por: string | null
          escopos: string[]
          id: string
          limite_dia: number | null
          nome: string
          organization_id: string
          revogado_em: string | null
          token_hash: string
          ultimo_uso_em: string | null
        }
        Insert: {
          criado_em?: string
          criado_por?: string | null
          escopos?: string[]
          id?: string
          limite_dia?: number | null
          nome: string
          organization_id: string
          revogado_em?: string | null
          token_hash: string
          ultimo_uso_em?: string | null
        }
        Update: {
          criado_em?: string
          criado_por?: string | null
          escopos?: string[]
          id?: string
          limite_dia?: number | null
          nome?: string
          organization_id?: string
          revogado_em?: string | null
          token_hash?: string
          ultimo_uso_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_tokens_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_tokens_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      aprovacoes: {
        Row: {
          agent_tool_id: string | null
          agente_id: string | null
          decidido_em: string | null
          decidido_por: string | null
          descricao: string | null
          id: string
          justificativa_agente: string | null
          organization_id: string | null
          payload_json: Json | null
          solicitado_em: string
          status: string
        }
        Insert: {
          agent_tool_id?: string | null
          agente_id?: string | null
          decidido_em?: string | null
          decidido_por?: string | null
          descricao?: string | null
          id?: string
          justificativa_agente?: string | null
          organization_id?: string | null
          payload_json?: Json | null
          solicitado_em?: string
          status?: string
        }
        Update: {
          agent_tool_id?: string | null
          agente_id?: string | null
          decidido_em?: string | null
          decidido_por?: string | null
          descricao?: string | null
          id?: string
          justificativa_agente?: string | null
          organization_id?: string | null
          payload_json?: Json | null
          solicitado_em?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "aprovacoes_agent_tool_id_fkey"
            columns: ["agent_tool_id"]
            isOneToOne: false
            referencedRelation: "agent_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aprovacoes_agente_id_fkey"
            columns: ["agente_id"]
            isOneToOne: false
            referencedRelation: "agentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aprovacoes_decidido_por_fkey"
            columns: ["decidido_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aprovacoes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_reports: {
        Row: {
          categoria: string | null
          id: string
          ja_no_mix: boolean | null
          marca: string
          mes_referencia: string
          n_vendedores: number | null
          onda_entrada: number | null
          organization_id: string
          pct_catalogo: number | null
          posicionamento: string | null
          receita: number | null
          saturacao: string | null
          score_priorizacao: number | null
          tendencia: string | null
          tendencia_pct: number | null
          ticket_medio: number | null
          unidades: number | null
          upload_id: string | null
        }
        Insert: {
          categoria?: string | null
          id?: string
          ja_no_mix?: boolean | null
          marca: string
          mes_referencia: string
          n_vendedores?: number | null
          onda_entrada?: number | null
          organization_id: string
          pct_catalogo?: number | null
          posicionamento?: string | null
          receita?: number | null
          saturacao?: string | null
          score_priorizacao?: number | null
          tendencia?: string | null
          tendencia_pct?: number | null
          ticket_medio?: number | null
          unidades?: number | null
          upload_id?: string | null
        }
        Update: {
          categoria?: string | null
          id?: string
          ja_no_mix?: boolean | null
          marca?: string
          mes_referencia?: string
          n_vendedores?: number | null
          onda_entrada?: number | null
          organization_id?: string
          pct_catalogo?: number | null
          posicionamento?: string | null
          receita?: number | null
          saturacao?: string | null
          score_priorizacao?: number | null
          tendencia?: string | null
          tendencia_pct?: number | null
          ticket_medio?: number | null
          unidades?: number | null
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brand_reports_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      collect_runs: {
        Row: {
          erros: number | null
          finalizado_em: string | null
          id: string
          iniciado_em: string
          itens_coletados: number | null
          marketplace: string
        }
        Insert: {
          erros?: number | null
          finalizado_em?: string | null
          id?: string
          iniciado_em?: string
          itens_coletados?: number | null
          marketplace: string
        }
        Update: {
          erros?: number | null
          finalizado_em?: string | null
          id?: string
          iniciado_em?: string
          itens_coletados?: number | null
          marketplace?: string
        }
        Relationships: []
      }
      competitor_listings: {
        Row: {
          categoria: string | null
          competitor_id: string
          condicao: string | null
          data_referencia: string
          desconto: boolean | null
          frete_gratis: boolean | null
          fulfillment: boolean | null
          gtin_bruto: string | null
          gtin_limpo: string | null
          id: string
          marca: string | null
          mercado_envios: boolean | null
          preco_medio: number | null
          sku: string | null
          subcategoria: string | null
          tamanho_detectado: string | null
          titulo: string
          upload_id: string | null
          vendas_reais: number
          vendas_unidades: number
        }
        Insert: {
          categoria?: string | null
          competitor_id: string
          condicao?: string | null
          data_referencia: string
          desconto?: boolean | null
          frete_gratis?: boolean | null
          fulfillment?: boolean | null
          gtin_bruto?: string | null
          gtin_limpo?: string | null
          id?: string
          marca?: string | null
          mercado_envios?: boolean | null
          preco_medio?: number | null
          sku?: string | null
          subcategoria?: string | null
          tamanho_detectado?: string | null
          titulo: string
          upload_id?: string | null
          vendas_reais?: number
          vendas_unidades?: number
        }
        Update: {
          categoria?: string | null
          competitor_id?: string
          condicao?: string | null
          data_referencia?: string
          desconto?: boolean | null
          frete_gratis?: boolean | null
          fulfillment?: boolean | null
          gtin_bruto?: string | null
          gtin_limpo?: string | null
          id?: string
          marca?: string | null
          mercado_envios?: boolean | null
          preco_medio?: number | null
          sku?: string | null
          subcategoria?: string | null
          tamanho_detectado?: string | null
          titulo?: string
          upload_id?: string | null
          vendas_reais?: number
          vendas_unidades?: number
        }
        Relationships: [
          {
            foreignKeyName: "competitor_listings_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competitor_listings_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      competitors: {
        Row: {
          id: string
          nome: string
          organization_id: string
        }
        Insert: {
          id?: string
          nome: string
          organization_id: string
        }
        Update: {
          id?: string
          nome?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversa_mensagens: {
        Row: {
          conversa_id: string
          criado_em: string
          custo_estimado: number | null
          ferramentas_usadas_json: Json | null
          id: string
          papel: string
          texto: string
          tokens: number | null
        }
        Insert: {
          conversa_id: string
          criado_em?: string
          custo_estimado?: number | null
          ferramentas_usadas_json?: Json | null
          id?: string
          papel: string
          texto: string
          tokens?: number | null
        }
        Update: {
          conversa_id?: string
          criado_em?: string
          custo_estimado?: number | null
          ferramentas_usadas_json?: Json | null
          id?: string
          papel?: string
          texto?: string
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "conversa_mensagens_conversa_id_fkey"
            columns: ["conversa_id"]
            isOneToOne: false
            referencedRelation: "conversas"
            referencedColumns: ["id"]
          },
        ]
      }
      conversas: {
        Row: {
          atualizado_em: string
          criado_em: string
          id: string
          titulo: string | null
          user_id: string
        }
        Insert: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          titulo?: string | null
          user_id: string
        }
        Update: {
          atualizado_em?: string
          criado_em?: string
          id?: string
          titulo?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      empresa_contexto: {
        Row: {
          atualizado_em: string
          atualizado_por: string | null
          chave: string
          id: string
          loja_id: string | null
          organization_id: string
          valor: string
        }
        Insert: {
          atualizado_em?: string
          atualizado_por?: string | null
          chave: string
          id?: string
          loja_id?: string | null
          organization_id: string
          valor: string
        }
        Update: {
          atualizado_em?: string
          atualizado_por?: string | null
          chave?: string
          id?: string
          loja_id?: string | null
          organization_id?: string
          valor?: string
        }
        Relationships: [
          {
            foreignKeyName: "empresa_contexto_atualizado_por_fkey"
            columns: ["atualizado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_contexto_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "empresa_contexto_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      eventos: {
        Row: {
          criado_em: string
          id: string
          origem: string | null
          payload_json: Json | null
          processado_em: string | null
          tipo: string
        }
        Insert: {
          criado_em?: string
          id?: string
          origem?: string | null
          payload_json?: Json | null
          processado_em?: string | null
          tipo: string
        }
        Update: {
          criado_em?: string
          id?: string
          origem?: string | null
          payload_json?: Json | null
          processado_em?: string | null
          tipo?: string
        }
        Relationships: []
      }
      gtin_groups: {
        Row: {
          atualizado_em: string
          categoria: string | null
          data_referencia: string
          gtin: string
          id: string
          marca: string | null
          n_anuncios: number
          n_concorrentes: number
          organization_id: string
          preco_medio_ponderado: number | null
          receita_total: number
          tamanho_detectado: string | null
          titulo_representativo: string | null
          unidades_total: number
        }
        Insert: {
          atualizado_em?: string
          categoria?: string | null
          data_referencia: string
          gtin: string
          id?: string
          marca?: string | null
          n_anuncios?: number
          n_concorrentes?: number
          organization_id: string
          preco_medio_ponderado?: number | null
          receita_total?: number
          tamanho_detectado?: string | null
          titulo_representativo?: string | null
          unidades_total?: number
        }
        Update: {
          atualizado_em?: string
          categoria?: string | null
          data_referencia?: string
          gtin?: string
          id?: string
          marca?: string | null
          n_anuncios?: number
          n_concorrentes?: number
          organization_id?: string
          preco_medio_ponderado?: number | null
          receita_total?: number
          tamanho_detectado?: string | null
          titulo_representativo?: string | null
          unidades_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "gtin_groups_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      lojas: {
        Row: {
          ativa: boolean
          canais: string[]
          criado_em: string
          id: string
          nome: string
          organization_id: string
        }
        Insert: {
          ativa?: boolean
          canais?: string[]
          criado_em?: string
          id?: string
          nome: string
          organization_id: string
        }
        Update: {
          ativa?: boolean
          canais?: string[]
          criado_em?: string
          id?: string
          nome?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lojas_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      metricas_historicas: {
        Row: {
          chave_dimensao: string
          criado_em: string
          data_referencia: string
          dimensao: string
          fonte: string | null
          id: string
          loja_id: string | null
          metrica: string
          organization_id: string
          valor: number
        }
        Insert: {
          chave_dimensao: string
          criado_em?: string
          data_referencia: string
          dimensao: string
          fonte?: string | null
          id?: string
          loja_id?: string | null
          metrica: string
          organization_id: string
          valor: number
        }
        Update: {
          chave_dimensao?: string
          criado_em?: string
          data_referencia?: string
          dimensao?: string
          fonte?: string | null
          id?: string
          loja_id?: string | null
          metrica?: string
          organization_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "metricas_historicas_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "metricas_historicas_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      monitored_products: {
        Row: {
          categoria: string | null
          criado_em: string
          criado_por: string | null
          gtin: string | null
          id: string
          marca: string | null
          organization_id: string
          prioridade: number
          titulo_referencia: string | null
        }
        Insert: {
          categoria?: string | null
          criado_em?: string
          criado_por?: string | null
          gtin?: string | null
          id?: string
          marca?: string | null
          organization_id: string
          prioridade?: number
          titulo_referencia?: string | null
        }
        Update: {
          categoria?: string | null
          criado_em?: string
          criado_por?: string | null
          gtin?: string | null
          id?: string
          marca?: string | null
          organization_id?: string
          prioridade?: number
          titulo_referencia?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monitored_products_criado_por_fkey"
            columns: ["criado_por"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "monitored_products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          criado_em: string
          id: string
          nome: string
        }
        Insert: {
          criado_em?: string
          id?: string
          nome: string
        }
        Update: {
          criado_em?: string
          id?: string
          nome?: string
        }
        Relationships: []
      }
      own_products: {
        Row: {
          ativo: boolean
          categoria: string | null
          criado_em: string
          custo_medio: number | null
          gtin: string | null
          id: string
          loja_id: string | null
          marca: string | null
          organization_id: string
          preco_atual: number | null
          sku: string
          subcategoria: string | null
          titulo: string
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          criado_em?: string
          custo_medio?: number | null
          gtin?: string | null
          id?: string
          loja_id?: string | null
          marca?: string | null
          organization_id: string
          preco_atual?: number | null
          sku: string
          subcategoria?: string | null
          titulo: string
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          criado_em?: string
          custo_medio?: number | null
          gtin?: string | null
          id?: string
          loja_id?: string | null
          marca?: string | null
          organization_id?: string
          preco_atual?: number | null
          sku?: string
          subcategoria?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "own_products_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "own_products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      own_sales_records: {
        Row: {
          canal: string | null
          comissao: number | null
          data: string
          fonte: string | null
          frete: number | null
          id: string
          imposto: number | null
          loja_id: string | null
          lucro: number | null
          margem_pct: number | null
          own_product_id: string | null
          receita: number
          unidades: number
          upload_id: string | null
        }
        Insert: {
          canal?: string | null
          comissao?: number | null
          data: string
          fonte?: string | null
          frete?: number | null
          id?: string
          imposto?: number | null
          loja_id?: string | null
          lucro?: number | null
          margem_pct?: number | null
          own_product_id?: string | null
          receita?: number
          unidades?: number
          upload_id?: string | null
        }
        Update: {
          canal?: string | null
          comissao?: number | null
          data?: string
          fonte?: string | null
          frete?: number | null
          id?: string
          imposto?: number | null
          loja_id?: string | null
          lucro?: number | null
          margem_pct?: number | null
          own_product_id?: string | null
          receita?: number
          unidades?: number
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "own_sales_records_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "own_sales_records_own_product_id_fkey"
            columns: ["own_product_id"]
            isOneToOne: false
            referencedRelation: "own_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "own_sales_records_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      own_stock_snapshots: {
        Row: {
          armazem: string | null
          custo_medio: number | null
          data_referencia: string
          estoque_atual: number
          id: string
          own_product_id: string
          upload_id: string | null
        }
        Insert: {
          armazem?: string | null
          custo_medio?: number | null
          data_referencia: string
          estoque_atual?: number
          id?: string
          own_product_id: string
          upload_id?: string | null
        }
        Update: {
          armazem?: string | null
          custo_medio?: number | null
          data_referencia?: string
          estoque_atual?: number
          id?: string
          own_product_id?: string
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "own_stock_snapshots_own_product_id_fkey"
            columns: ["own_product_id"]
            isOneToOne: false
            referencedRelation: "own_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "own_stock_snapshots_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      price_snapshots: {
        Row: {
          coletado_em: string
          collect_run_id: string | null
          disponivel: boolean | null
          fonte: string
          gtin: string
          id: string
          marketplace: string
          organization_id: string
          preco: number | null
          vendedor: string | null
        }
        Insert: {
          coletado_em?: string
          collect_run_id?: string | null
          disponivel?: boolean | null
          fonte?: string
          gtin: string
          id?: string
          marketplace: string
          organization_id: string
          preco?: number | null
          vendedor?: string | null
        }
        Update: {
          coletado_em?: string
          collect_run_id?: string | null
          disponivel?: boolean | null
          fonte?: string
          gtin?: string
          id?: string
          marketplace?: string
          organization_id?: string
          preco?: number | null
          vendedor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_snapshots_collect_run_id_fkey"
            columns: ["collect_run_id"]
            isOneToOne: false
            referencedRelation: "collect_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_snapshots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      revisoes_semanais: {
        Row: {
          criado_em: string
          custo_total_ia: number | null
          documento_md: string | null
          id: string
          lido_em: string | null
          organization_id: string | null
          periodo_fim: string
          periodo_inicio: string
          recomendacoes_json: Json | null
          resumo: string | null
        }
        Insert: {
          criado_em?: string
          custo_total_ia?: number | null
          documento_md?: string | null
          id?: string
          lido_em?: string | null
          organization_id?: string | null
          periodo_fim: string
          periodo_inicio: string
          recomendacoes_json?: Json | null
          resumo?: string | null
        }
        Update: {
          criado_em?: string
          custo_total_ia?: number | null
          documento_md?: string | null
          id?: string
          lido_em?: string | null
          organization_id?: string | null
          periodo_fim?: string
          periodo_inicio?: string
          recomendacoes_json?: Json | null
          resumo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "revisoes_semanais_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      uploads: {
        Row: {
          criado_em: string
          detalhe_erros_json: Json | null
          hash_arquivo: string | null
          id: string
          linhas_processadas: number
          linhas_rejeitadas: number
          nome_arquivo: string
          organization_id: string
          status: string
          tipo: string
          usuario_id: string | null
        }
        Insert: {
          criado_em?: string
          detalhe_erros_json?: Json | null
          hash_arquivo?: string | null
          id?: string
          linhas_processadas?: number
          linhas_rejeitadas?: number
          nome_arquivo: string
          organization_id: string
          status?: string
          tipo: string
          usuario_id?: string | null
        }
        Update: {
          criado_em?: string
          detalhe_erros_json?: Json | null
          hash_arquivo?: string | null
          id?: string
          linhas_processadas?: number
          linhas_rejeitadas?: number
          nome_arquivo?: string
          organization_id?: string
          status?: string
          tipo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "uploads_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uploads_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lojas: {
        Row: {
          loja_id: string
          user_id: string
        }
        Insert: {
          loja_id: string
          user_id: string
        }
        Update: {
          loja_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_lojas_loja_id_fkey"
            columns: ["loja_id"]
            isOneToOne: false
            referencedRelation: "lojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lojas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          ativo: boolean
          criado_em: string
          email: string
          id: string
          nome: string
          organization_id: string
          papel: string
        }
        Insert: {
          ativo?: boolean
          criado_em?: string
          email: string
          id: string
          nome: string
          organization_id: string
          papel?: string
        }
        Update: {
          ativo?: boolean
          criado_em?: string
          email?: string
          id?: string
          nome?: string
          organization_id?: string
          papel?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      criar_usuario_equipe: {
        Args: {
          p_email: string
          p_nome: string
          p_papel: string
          p_senha: string
        }
        Returns: string
      }
      current_org_id: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      meses_concorrencia: {
        Args: never
        Returns: {
          mes: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
