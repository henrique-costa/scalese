-- CreateTable
CREATE TABLE "bombons" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imagemUrl" TEXT,
    "sabor" TEXT NOT NULL,
    "peso" INTEGER NOT NULL,
    "unidades" INTEGER NOT NULL DEFAULT 1,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bombons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bolos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imagemUrl" TEXT,
    "sabor" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "porcoes" INTEGER NOT NULL,
    "personalizado" BOOLEAN NOT NULL DEFAULT false,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bolos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combos_festa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imagemUrl" TEXT,
    "itensInclusos" TEXT NOT NULL,
    "servePessoas" INTEGER NOT NULL,
    "temaBolo" TEXT,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "combos_festa_pkey" PRIMARY KEY ("id")
);
