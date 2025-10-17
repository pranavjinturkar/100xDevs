import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(
  username: string,
  password: string,
  name: string
) {
  const res = await client.query(
    `
         insert into users (username, password, name)
         values ($1, $2, $3)
         returning username, password, name
      `,
    [username, password, name]
  );

  return res.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const res = await client.query(
    `select * from users where id = $1`,
    [userId]
  );

  console.log(res.rows[0]);
  return res.rows[0];
}
