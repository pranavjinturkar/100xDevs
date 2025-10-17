import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const createTodoQuery = `
   INSERT INTO todos 
   (user_id, title, description) 
   VALUES ($1, $2, $3) 
   RETURNING title, description, done, id`;

  const createdTodo = await client.query(createTodoQuery, [
    userId,
    title,
    description,
  ]);

  return createdTodo.rows[0];
}

/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const res = await client.query(
    `
         update todos 
         set done = $1 
         where id = $2
         returning title, description, done, id
      `,
    [true, todoId]
  );

  return res.rows[0];
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const todos = await client.query(
    `
      select * from todos 
      where user_id = $1      
   `,
    [userId]
  );

  console.log(todos.rows);

  return todos.rows;
}
