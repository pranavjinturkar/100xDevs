import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// take : Limit (in postgres)
// skip : offset (in postgres)

async function main() {
  const res = await prisma.post.findMany({
    take: 5,
    skip: 5,
    where: {
      authorId: 1,
    },
  });

  console.log(res);
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
