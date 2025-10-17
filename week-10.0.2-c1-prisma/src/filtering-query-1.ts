import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const res = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "gmail.com",
      },
      posts: {
        some: {
          published: true,
        },
      },
    },
  });

  const res2 = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "gmail.com",
      },
    },
    include: {
      posts: {
        where: {
          published: true,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  });
