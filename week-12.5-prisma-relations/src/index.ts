import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type Todo = {
  title: string;
  description: string;
  userId: number;
  completed?: boolean;
};

async function insertUser(user: User) {
  const userRes = await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      firstname: user.firstName || null,
      lastname: user.lastName || null,
    },
  });

  return userRes;
}

async function insertTodo(todo: Todo) {
  const { description, title, userId, completed = false } = todo;

  const response = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
      completed,
    },
  });
}

async function getTodo(userId: number) {
  const response = await prisma.todo.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      user: {
        select: {
          username: true,
          password: true,
        },
      },
    },
  });

  console.log(response);
  return response;
}

getTodo(1);

// insertUser({
//   username: "test2",
//   password: "test2",
// });

// insertTodo({
//   title: "Todo1",
//   description: "Desc1",
//   userId: 1,
// });

// insertUser({
//   username: "test10",
//   password: "test3",
//   firstName: "test3",
//   lastName: "test4",
// });
