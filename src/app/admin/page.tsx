import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  // Contadores rápidos
  const [totalBombons, totalBolos, totalCombos] = await Promise.all([
    prisma.bombom.count(),
    prisma.bolo.count(),
    prisma.comboFesta.count(),
  ]);

  const stats = [
    {
      label: "Bombons",
      count: totalBombons,
      href: "/admin/bombons",
      emoji: "🍫",
      color: "bg-brand-rose-light",
    },
    {
      label: "Bolos",
      count: totalBolos,
      href: "/admin/bolos",
      emoji: "🎂",
      color: "bg-brand-gold-light",
    },
    {
      label: "Combos Festa",
      count: totalCombos,
      href: "/admin/combos",
      emoji: "🎉",
      color: "bg-brand-mint-light",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
        Painel Administrativo
      </h1>
      <p className="font-body text-brand-chocolate-light mb-8">
        Gerencie os produtos da Confetteria Scalese
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className={`${stat.color} rounded-2xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1`}
          >
            <div className="text-3xl mb-3">{stat.emoji}</div>
            <p className="font-display text-4xl font-bold text-brand-chocolate">
              {stat.count}
            </p>
            <p className="font-body text-sm text-brand-chocolate-light mt-1">
              {stat.label} cadastrados
            </p>
          </a>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white rounded-2xl shadow-soft">
        <h2 className="font-display text-xl font-bold text-brand-chocolate mb-2">
          Próximos passos
        </h2>
        <p className="font-body text-brand-chocolate-light text-sm">
          O CRUD completo com formulários visuais será implementado no Passo 4.
          Por enquanto, use o Prisma Studio (
          <code className="bg-brand-cream px-2 py-0.5 rounded text-xs">
            npm run db:studio
          </code>
          ) para gerenciar produtos.
        </p>
      </div>
    </div>
  );
}
