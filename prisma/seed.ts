import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🍫 Iniciando seed do banco da Confetteria Scalese...\n");

  // Limpar dados existentes
  await prisma.bombom.deleteMany();
  await prisma.bolo.deleteMany();
  await prisma.comboFesta.deleteMany();

  // =============================================
  // BOMBONS
  // =============================================
  const bombons = await prisma.bombom.createMany({
    data: [
      {
        nome: "Brigadeiro Tradicional",
        descricao:
          "Nosso clássico brigadeiro de chocolate ao leite, feito com cacau nobre e finalizado com granulado belga.",
        preco: 5.5,
        sabor: "Chocolate ao Leite",
        peso: 30,
        unidades: 1,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1573595561175-3047155b891e?q=80&w=1834",
      },
      {
        nome: "Brigadeiro de Beijinho",
        descricao:
          "Brigadeiro cremoso de coco ralado com leite condensado artesanal, envolto em coco fino.",
        preco: 5.5,
        sabor: "Beijinho",
        peso: 30,
        unidades: 1,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1604413191066-4dd20bedf486?q=80&w=1320",
      },
      {
        nome: "Trufa de Pistache",
        descricao:
          "Trufa premium de pistache siciliano com ganache de chocolate branco belga. Edição especial.",
        preco: 9.9,
        sabor: "Pistache",
        peso: 35,
        unidades: 1,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80",
      },
      {
        nome: "Brigadeiro de Ninho",
        descricao:
          "Brigadeiro cremoso feito com leite ninho, suave e irresistível. Favorito das crianças.",
        preco: 5.5,
        sabor: "Ninho",
        peso: 30,
        unidades: 1,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&q=80",
      },
      {
        nome: "Trufa de Maracujá",
        descricao:
          "Trufa refrescante com ganache de maracujá natural e cobertura de chocolate meio amargo.",
        preco: 7.9,
        sabor: "Maracujá",
        peso: 35,
        unidades: 1,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
      },
      {
        nome: "Brigadeiro de Nutella",
        descricao:
          "Brigadeiro gourmet com creme de avelã, finalizado com nibs de cacau crocante.",
        preco: 7.5,
        sabor: "Nutella",
        peso: 30,
        unidades: 1,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80",
      },
      {
        nome: "Caixa Degustação 6un",
        descricao:
          "Caixa com 6 brigadeiros sortidos: tradicional, beijinho, ninho, nutella, limão e pistache.",
        preco: 38.0,
        sabor: "Sortido",
        peso: 180,
        unidades: 6,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80",
      },
      {
        nome: "Caixa Premium 12un",
        descricao:
          "Seleção premium com 12 brigadeiros gourmet em caixa decorada. Ideal para presente.",
        preco: 72.0,
        sabor: "Sortido Premium",
        peso: 360,
        unidades: 12,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80",
      },
    ],
  });
  console.log(`✅ ${bombons.count} bombons criados`);

  // =============================================
  // BOLOS
  // =============================================
  const bolos = await prisma.bolo.createMany({
    data: [
      {
        nome: "Bolo Novo Ciclo",
        descricao:
          "Bolo delicado em degradê rosa com detalhes dourados e topper personalizado. Perfeito para comemorações especiais.",
        preco: 189.0,
        sabor: "Baunilha com Morango",
        tamanho: "M",
        porcoes: 20,
        personalizado: true,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80",
      },
      {
        nome: "Bolo Temático Infantil",
        descricao:
          "Bolo de dois andares com tema personalizado, pasta americana e topper exclusivo. Feito com muito carinho para a festa dos pequenos.",
        preco: 280.0,
        sabor: "Chocolate",
        tamanho: "G",
        porcoes: 35,
        personalizado: true,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&q=80",
      },
      {
        nome: "Alfajor Scalese",
        descricao:
          "Nosso alfajor artesanal com camadas de massa amanteigada, doce de leite e cobertura de chocolate ao leite.",
        preco: 85.0,
        sabor: "Doce de Leite",
        tamanho: "P",
        porcoes: 8,
        personalizado: false,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
      },
      {
        nome: "Bolo Red Velvet",
        descricao:
          "Clássico red velvet com cream cheese frosting, decorado com raspas de chocolate branco.",
        preco: 165.0,
        sabor: "Red Velvet",
        tamanho: "M",
        porcoes: 15,
        personalizado: false,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80",
      },
      {
        nome: "Bolo Chocolate Intenso",
        descricao:
          "Para os amantes de chocolate: massa de cacau 70%, recheio de ganache e cobertura drip de chocolate belga.",
        preco: 175.0,
        sabor: "Chocolate 70%",
        tamanho: "M",
        porcoes: 18,
        personalizado: false,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      },
      {
        nome: "Mini Bolo Presente",
        descricao:
          "Mini bolo individual perfeito para presentes. Decorado com laço e tag personalizada.",
        preco: 55.0,
        sabor: "Baunilha",
        tamanho: "P",
        porcoes: 2,
        personalizado: true,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80",
      },
    ],
  });
  console.log(`✅ ${bolos.count} bolos criados`);

  // =============================================
  // COMBOS FESTA
  // =============================================
  const combos = await prisma.comboFesta.createMany({
    data: [
      {
        nome: "Combo Festa Encantada",
        descricao:
          "Kit completo para festa infantil com bolo temático, 50 brigadeiros sortidos e 30 mini cupcakes decorados.",
        preco: 520.0,
        itensInclusos: JSON.stringify([
          "1 Bolo temático 2 andares (tema à escolha)",
          "50 Brigadeiros gourmet sortidos",
          "30 Mini cupcakes decorados",
          "Embalagens personalizadas",
        ]),
        servePessoas: 40,
        temaBolo: "Personalizado",
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
      },
      {
        nome: "Combo Mesa de Doces",
        descricao:
          "Mesa de doces completa para eventos: brigadeiros, beijinhos, trufas, morangos com chocolate e caixinha personalizada.",
        preco: 380.0,
        itensInclusos: JSON.stringify([
          "100 Brigadeiros sortidos (5 sabores)",
          "20 Morangos cobertos com chocolate",
          "30 Mini brownies",
          "Suporte e decoração da mesa",
        ]),
        servePessoas: 30,
        temaBolo: null,
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
      },
      {
        nome: "Combo Aniversário Completo",
        descricao:
          "Tudo para o aniversário: bolo personalizado, 100 brigadeiros, cupcakes e lembrancinhas em caixinha.",
        preco: 780.0,
        itensInclusos: JSON.stringify([
          "1 Bolo personalizado (até 3 andares)",
          "100 Brigadeiros gourmet (6 sabores)",
          "40 Mini cupcakes temáticos",
          "30 Lembrancinhas em caixinha",
          "Topper personalizado para o bolo",
        ]),
        servePessoas: 60,
        temaBolo: "Personalizado",
        destaque: true,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80",
      },
      {
        nome: "Combo Chá de Bebê",
        descricao:
          "Kit especial para chá de bebê com doces delicados em tons pastéis e bolo temático.",
        preco: 450.0,
        itensInclusos: JSON.stringify([
          "1 Bolo temático chá de bebê",
          "60 Brigadeiros em tons pastéis",
          "20 Cake pops decorados",
          "Decoração de mesa em tons suaves",
        ]),
        servePessoas: 25,
        temaBolo: "Chá de Bebê",
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1605823435090-e58ae44cb12e?w=800&q=80",
      },
      {
        nome: "Combo Corporativo",
        descricao:
          "Kit para eventos empresariais com doces finos, embalagens elegantes e opção de logo personalizado.",
        preco: 650.0,
        itensInclusos: JSON.stringify([
          "80 Trufas gourmet sortidas",
          "40 Alfajores individuais",
          "30 Brownies premium",
          "Embalagens com logo da empresa",
        ]),
        servePessoas: 50,
        temaBolo: null,
        destaque: false,
        disponivel: true,
        imagemUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
      },
    ],
  });
  console.log(`✅ ${combos.count} combos festa criados`);

  console.log("\n🎉 Seed concluído com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
