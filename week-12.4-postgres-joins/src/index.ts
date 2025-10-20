// write a function to create a users table in your database.
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://postgres:root@localhost:5555/postgres?sslmode=disable",
});

async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

type User = {
  username: string;
  password: string;
  email: string;
};

async function insertUser(user: User) {
  const { email, password, username } = user;
  await client.connect();
  const result = await client.query(
    `
         insert into users (username, email, password) values ($1, $2, $3)
      `,
    [username, email, password]
  );

  console.log(result);
}

// createUsersTable();
insertUser({
  email: "pranav@gmail.com",
  password: "124",
  username: "abc",
});
