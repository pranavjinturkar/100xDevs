import { PrismaClient } from "@prisma/client";

const primsa = new PrismaClient();

async function main() {
  const users = await primsa.user.findMany({});
  console.log(users);
  const user = await primsa.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      posts: true,
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await primsa.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await primsa.$disconnect();
    process.exit(1);
  });
