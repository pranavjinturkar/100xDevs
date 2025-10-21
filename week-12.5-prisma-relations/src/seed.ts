import { PrismaClient } from "@prisma/client";
import process from "process";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: "alice",
      password: "password123",
      firstName: "Alice",
      lastName: "Anderson",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "bob",
      password: "password456",
      firstName: "Bob",
      lastName: "Brown",
    },
  });

  // Todos
  const todo1 = await prisma.todo.createMany({
    data: [
      {
        title: "Finish report",
        description: "Complete the project report before Friday",
        completed: false,
        userId: user1.id,
      },
      {
        title: "Prepare slides",
        description: "Prepare slides for Monday’s meeting",
        completed: false,
        userId: user1.id,
      },
      {
        title: "Review PR #24",
        description: "Code review for team repo",
        completed: true,
        userId: user2.id,
      },
      {
        title: "Review PR #26",
        description: "Code review for team repo and cicd",
        completed: true,
        userId: user2.id,
      },
      {
        title: "CICD Pipeline",
        description: "Setup a cicd for this prisma",
        completed: true,
        userId: user1.id,
      },
    ],
  });

  console.log("Users and todos created successfully!");
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
