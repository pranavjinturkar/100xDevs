import { PrismaClient } from "@prisma/client";

// { log: ["info", "query"] } : can be used under prisma client to get logs

const prisma = new PrismaClient();

let createCount = 3;

async function main(count: number) {
  let i = 0;
  while (i < count) {
    await prisma.post.create({
      data: {
        title: `Post ${i}`,
        content: `Content of Post ${i}`,
        published: false,
        // authorId: 1,
        author: {
          connect: {
            id: 1,
          },
        },
      },
    });
    i++;
  }
}

main(createCount)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
