import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updateUser = await prisma.user.update({
    where: {
      id: 1,
    },
    data: {
      posts: {
        deleteMany: {
          published: false,
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
