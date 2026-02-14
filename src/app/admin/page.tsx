import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  // Contadores rápidos
  const [totalBombons, totalBolos, totalCombos, totalPedidos] = await Promise.all([
    prisma.bombom.count(),
    prisma.bolo.count(),
    prisma.comboFesta.count(),
    prisma.order.count(),
  ]);

  const stats = [
    {
      label: "Pedidos",
      count: totalPedidos,
      href: "/admin/pedidos",
      emoji: "🛒",
      color: "bg-green-100",
    },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

    </div>
  );
}
