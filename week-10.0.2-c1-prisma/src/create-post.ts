import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  await prisma.post.create({
    data: {
      title: "Post 1",
      content: "Content of Post 1",
      published: true,
      // authorId: 1,
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
