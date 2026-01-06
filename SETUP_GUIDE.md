# 🚀 Guia de Setup - Template White-Label de Casamento

Este guia explica como configurar o projeto para um **novo cliente** do zero.

---

## 📋 Checklist Rápido

- [ ] Criar projeto no Supabase
- [ ] Executar SQL para criar tabelas
- [ ] Criar bucket de Storage
- [ ] Criar usuário admin
- [ ] Configurar variáveis de ambiente
- [ ] Editar configuração do casamento
- [ ] Deploy no Vercel

---

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Organization:** Selecione ou crie uma
   - **Name:** `casamento-nome-noiva` (exemplo)
   - **Database Password:** Guarde esta senha!
   - **Region:** Escolha o mais próximo (South America)
4. Clique em **"Create new project"**
5. Aguarde a criação (pode levar alguns minutos)

---

## 2. Criar Tabelas no Banco de Dados

1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `database_schema.sql` do projeto
4. Cole no editor e clique em **"Run"**
5. Verifique se não há erros

> ✅ Isso criará as tabelas: `gifts`, `gift_payments`, `rsvp_responses`

---

## 3. Criar Bucket de Storage para Imagens

1. No painel do Supabase, vá em **Storage**
2. Clique em **"New bucket"**
3. Configure:
   - **Name:** `gifts`
   - **Public bucket:** ✅ Marque esta opção
4. Clique em **"Create bucket"**

### Configurar Políticas do Bucket

1. Com o bucket `gifts` selecionado, clique em **"Policies"**
2. Adicione estas políticas:

**Leitura Pública:**
```sql
CREATE POLICY "Leitura pública" ON storage.objects
FOR SELECT USING (bucket_id = 'gifts');
```

**Upload Autenticado:**
```sql
CREATE POLICY "Upload autenticado" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'gifts');
```

---

## 4. Criar Usuário Admin

Este é o usuário que terá acesso ao Painel Administrativo.

1. No painel do Supabase, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email:** `admin@casamento.com` (ou o email do cliente)
   - **Password:** Crie uma senha forte
   - **Auto Confirm User:** ✅ Marque esta opção
4. Clique em **"Create user"**

> ⚠️ **Importante:** Guarde essas credenciais! O cliente usará para acessar o painel admin.

---

## 5. Obter Credenciais do Supabase

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public key** (começa com `eyJ...`)

---

## 6. Configurar o Projeto

### 6.1 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...sua-chave-aqui

# Mercado Pago (opcional - para pagamentos com cartão)
# Configure no Vercel, NÃO no .env local
```

### 6.2 Dados do Casamento

Edite o arquivo `src/config/wedding-config.ts`:

```typescript
export const COUPLE = {
  groom: "Nome do Noivo",
  bride: "Nome da Noiva",
  displayName: "Noivo & Noiva",
  initials: "N & N",
  story: {
    paragraph1: "História do casal...",
    paragraph2: "Continuação..."
  }
};

export const WEDDING = {
  date: new Date("2026-12-31T18:00:00"),
  dateFormatted: "31 de Dezembro de 2026",
  time: "18:00",
  confirmationDeadline: "15/12/2026"
};

// ... continuar com VENUE, CONTACT, PIX, etc.
```

---

## 7. Testar Localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar http://localhost:8080
```

### Testar Login Admin

1. Acesse `/admin` no site
2. Use as credenciais criadas no passo 4
3. Verifique se consegue ver o dashboard

---

## 8. Deploy no Vercel

### 8.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Importe o repositório do GitHub

### 8.2 Configurar Variáveis de Ambiente

Na página de configuração do projeto Vercel:

1. Vá em **Settings** → **Environment Variables**
2. Adicione:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anon do Supabase |
| `MERCADO_PAGO_ACCESS_TOKEN` | Token de produção do MP (se usar cartão) |

### 8.3 Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar
3. Acesse a URL gerada para testar

---

## 9. Importar Lista de Presentes

Após o deploy:

1. Acesse `/admin` no site
2. Faça login com as credenciais admin
3. Vá na aba **"Gerenciar Lista"**
4. Clique em **"Importar Lista Inicial"**

> Isso populará o banco com os 72 presentes pré-definidos.

---

## 🔧 Troubleshooting

### "Supabase não configurado"
- Verifique se as variáveis `VITE_SUPABASE_*` estão corretas
- Reinicie o servidor de desenvolvimento

### "Senha incorreta no login"
- Confirme que o usuário foi criado no Supabase Auth
- Verifique se marcou "Auto Confirm User"

### Imagens não carregam
- Verifique se o bucket `gifts` foi criado como público
- Verifique as políticas do bucket

### Pagamentos não funcionam
- Configure `MERCADO_PAGO_ACCESS_TOKEN` no Vercel
- Use token de **produção**, não sandbox

---

## 📞 Suporte

Para dúvidas técnicas, consulte a documentação:
- [DOCUMENTACAO.md](./DOCUMENTACAO.md) - Documentação técnica completa
- [database_schema.sql](./database_schema.sql) - Schema do banco de dados
