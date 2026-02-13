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

## 📁 Estrutura do Projeto

```
confetteria-scalese/
├── prisma/
│   ├── schema.prisma      # 3 entidades: Bombom, Bolo, ComboFesta
│   └── seed.ts            # Dados de exemplo
├── src/
│   ├── actions/           # Server Actions (CRUD)
│   │   ├── bombom.actions.ts
│   │   ├── bolo.actions.ts
│   │   └── combo.actions.ts
│   ├── app/
│   │   ├── globals.css    # Identidade visual Scalese
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home (placeholder)
│   ├── lib/
│   │   ├── prisma.ts      # Singleton do Prisma Client
│   │   ├── utils.ts       # Utilitários (safeAction, formatPrice)
│   │   └── validations.ts # Schemas Zod para todas as entidades
│   └── middleware.ts       # Middleware (Clerk no Passo 2)
├── __tests__/
│   ├── validations.test.ts # Testes das validações Zod
│   └── utils.test.ts       # Testes dos utilitários
└── .env.example
```

---

## 🎨 Paleta de Cores (Identidade Scalese)

| Cor | Hex | Uso |
|-----|-----|-----|
| Rosa | `#E8A0BF` | Cor principal, botões, destaques |
| Rosa Claro | `#F5D0E0` | Backgrounds suaves |
| Dourado | `#C9A96E` | Detalhes premium, bordas |
| Verde Menta | `#8DBFAB` | Acentos, badges |
| Marrom Chocolate | `#5C3D2E` | Textos, títulos |
| Creme | `#FFF8F0` | Background principal |

---

