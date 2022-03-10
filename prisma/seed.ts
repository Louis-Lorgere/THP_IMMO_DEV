import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Maison 5 pièces 136 m²',
          content: 'Particulier vend ferme de 160 m2 entièrement à rénover sur terrain de 3067 m2 placé sur les hauteurs du village de GAURÉ, idéalement situé à 15 min de BALMA ou de SAINT ORENS, cette ferme possède une rare vue dégagé et imprenable sur la campagne.',
          published: true,
          price: 295000,
          city: 'Gauré'
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Maison Balma 135m2 sur terrain 1500M2 constructible',
          content: "Sur sous sol complet, se trouve cette maison lumineuse, au calme. Au 1er étage, se trouvent la pièce de vie avec cuisine équipée, 2 chambres, salle de bain et wc indépendant ; à l'étage supérieur se trouvent 3 pièces en enfilade (2 chambres et 1 bureau). Le chauffage est au fioul et bois (insert). Les fenêtres sont en double vitrage pvc. L'assainissement individuel n'est pas conforme. L'électricité est à revoir. La situation géographique est idéale, à la campagne, secteur non isolé mais dernière…",
          published: true,
          price: 115000,
          city: 'Prudoma'
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Maison de campagne 6 pièces et son terrain arborisé',
          content: "Maison de campagne en parfait état sur les hauteurs d'Aubin - Cité de duc avec un grand terrain qui offre une vue splendide sur la verdure environnante. Maison de 120m² sur 2 niveaux avec 6 pièces et terrain arborisé de 2400m². Elle est située au bout d'une impasse et offre un cadre magnifique avec une tranquillité absolue.",
          published: true,
          price: 215000,
          city: 'Aubin'
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
