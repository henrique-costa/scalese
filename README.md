# 🍫 Confetteria Scalese

Site completo para a Confetteria Scalese — doces artesanais feitos com amor.

**Stack:** Next.js 14 + React 18 + Prisma + Clerk + Tailwind CSS + Zod

---

## 🚀 Setup Rápido

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

### 3. Configurar o banco de dados
```bash
# Gerar o Prisma Client
npx prisma generate

# Criar as tabelas (SQLite para dev)
npx prisma db push

# Popular com dados de exemplo
npm run db:seed
```

### 4. Rodar em desenvolvimento
```bash
npm run dev
```

### 5. Rodar testes
```bash
npm test
```

---



