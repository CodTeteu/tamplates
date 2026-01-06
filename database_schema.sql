-- ============================================================================
-- DATABASE SCHEMA - Template White-Label de Casamento
-- ============================================================================
-- 
-- INSTRUÇÕES PARA NOVOS CLIENTES:
-- 1. Crie um novo projeto no Supabase (https://supabase.com)
-- 2. Vá para SQL Editor no painel do Supabase
-- 3. Cole este script inteiro e clique em "Run"
-- 4. Configure o Storage Bucket separadamente (ver abaixo)
-- 5. Crie um usuário admin em Authentication -> Users -> Add User
--
-- ============================================================================

-- ============================================================================
-- TABELA: gifts
-- Catálogo de presentes disponíveis para os convidados
-- ============================================================================

CREATE TABLE IF NOT EXISTS gifts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url TEXT,
    category TEXT NOT NULL DEFAULT 'Outros',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_gifts_category ON gifts(category);
CREATE INDEX IF NOT EXISTS idx_gifts_featured ON gifts(featured);

COMMENT ON TABLE gifts IS 'Catálogo de presentes disponíveis para compra pelos convidados';
COMMENT ON COLUMN gifts.featured IS 'Se true, o presente aparece em destaque na lista';
COMMENT ON COLUMN gifts.image_url IS 'URL da imagem do presente (bucket: gifts)';

-- ============================================================================
-- TABELA: gift_payments
-- Registro de pagamentos de presentes (PIX ou Mercado Pago)
-- ============================================================================

CREATE TABLE IF NOT EXISTS gift_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_name TEXT NOT NULL,
    buyer_email TEXT,
    buyer_phone TEXT,
    items JSONB NOT NULL DEFAULT '[]',
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'pix', -- 'pix' ou 'mercadopago'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'pending_confirmation', 'approved', 'rejected', 'cancelled'
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_gift_payments_status ON gift_payments(status);
CREATE INDEX IF NOT EXISTS idx_gift_payments_created_at ON gift_payments(created_at DESC);

COMMENT ON TABLE gift_payments IS 'Registro de pagamentos de presentes pelos convidados';
COMMENT ON COLUMN gift_payments.items IS 'Array JSON com os itens: [{id, name, price, quantity}]';
COMMENT ON COLUMN gift_payments.status IS 'pending=aguardando, pending_confirmation=PIX enviado, approved=confirmado, rejected=rejeitado, cancelled=cancelado';

-- ============================================================================
-- TABELA: rsvp_responses
-- Confirmações de presença dos convidados
-- ============================================================================

CREATE TABLE IF NOT EXISTS rsvp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    is_attending BOOLEAN DEFAULT TRUE,
    total_guests INTEGER DEFAULT 1,
    companions JSONB DEFAULT '[]', -- [{name: string, isChild: boolean}]
    payment_method TEXT DEFAULT 'none', -- 'pix', 'card', 'none'
    total_cost DECIMAL(10,2) DEFAULT 0,
    song_request TEXT,
    message TEXT,
    status TEXT DEFAULT 'confirmed', -- 'confirmed', 'declined', 'pending_payment', 'paid'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_is_attending ON rsvp_responses(is_attending);
CREATE INDEX IF NOT EXISTS idx_rsvp_responses_created_at ON rsvp_responses(created_at DESC);

COMMENT ON TABLE rsvp_responses IS 'Confirmações de presença (RSVP) dos convidados';
COMMENT ON COLUMN rsvp_responses.companions IS 'Array JSON de acompanhantes: [{name: "Nome", isChild: false}]';
COMMENT ON COLUMN rsvp_responses.status IS 'confirmed=confirmado, declined=não comparecerá, pending_payment=aguardando, paid=pago';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Permite INSERT anônimo e SELECT/UPDATE/DELETE apenas para autenticados
-- ============================================================================

-- Habilitar RLS nas tabelas
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- GIFTS: Leitura pública, escrita apenas autenticado
CREATE POLICY "gifts_select_public" ON gifts FOR SELECT USING (true);
CREATE POLICY "gifts_insert_authenticated" ON gifts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "gifts_update_authenticated" ON gifts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "gifts_delete_authenticated" ON gifts FOR DELETE TO authenticated USING (true);

-- GIFT_PAYMENTS: Insert público (para registrar pagamentos), leitura/update/delete autenticado
CREATE POLICY "giftpayments_insert_public" ON gift_payments FOR INSERT WITH CHECK (true);
CREATE POLICY "giftpayments_select_authenticated" ON gift_payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "giftpayments_update_authenticated" ON gift_payments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "giftpayments_delete_authenticated" ON gift_payments FOR DELETE TO authenticated USING (true);

-- RSVP_RESPONSES: Insert público (para convidados confirmarem), leitura/update/delete autenticado
CREATE POLICY "rsvp_insert_public" ON rsvp_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "rsvp_select_authenticated" ON rsvp_responses FOR SELECT TO authenticated USING (true);
CREATE POLICY "rsvp_update_authenticated" ON rsvp_responses FOR UPDATE TO authenticated USING (true);
CREATE POLICY "rsvp_delete_authenticated" ON rsvp_responses FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- STORAGE BUCKET (executar separadamente no painel Storage do Supabase)
-- ============================================================================
-- 
-- 1. Vá em Storage no painel do Supabase
-- 2. Clique em "New bucket"
-- 3. Nome: gifts
-- 4. Marque "Public bucket"
-- 5. Clique em "Create bucket"
-- 
-- POLICY para o bucket (SQL Editor):
-- 
-- CREATE POLICY "gifts_bucket_public_read"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'gifts');
-- 
-- CREATE POLICY "gifts_bucket_authenticated_insert"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'gifts');
--
-- ============================================================================

-- ============================================================================
-- SCRIPT FINALIZADO
-- ============================================================================
-- 
-- Próximos passos:
-- 1. Configure o Storage Bucket conforme instruções acima
-- 2. Crie um usuário admin: Authentication -> Users -> Add User
-- 3. Configure as variáveis de ambiente no seu projeto
-- 4. Deploy no Vercel
--
-- ============================================================================
