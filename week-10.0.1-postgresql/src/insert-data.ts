import { getClient } from "./utils";



let arr: string[] = [];
for (let i = 3; i < 1000 * 1000 * 10 + 3; i++) {
  const inp1: string = `john.do11e@gmail${i}.com`;
  const inp2: string = "hashed_password_here";
  arr.push(`('${inp1}', '${inp2}')`);
}

const n = 3000;

// for (let i = 0; i < arr.length; i += n) {
//   let minArr: string[];
//   if (i + n > arr.length - 1) {
//     minArr = arr.slice(i, arr.length);
//   } else minArr = arr.slice(i, n + i);
//   console.log(i, minArr.length);
// }

async function createEntries() {
  const client = await getClient();
  try {
    for (let i = 0; i < arr.length; i += n) {
      let minArr: string[];
      if (i + n > arr.length - 1) {
        minArr = arr.slice(i, arr.length);
      } else minArr = arr.slice(i, n + i);
      const insertUserText = `INSERT INTO users (email, password) VALUES ${minArr
        .map((item, idx) => item)
        .join(", ")};`;
      // const userValues = ["john.do11e@gmail2.com", "hashed_password_here"];

      // let response = await client.query(insertUserText, userValues);

      await client.query(insertUserText);
    }
    //   const insertTodoText =
    //     "INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id";
    //   const todoValues = [
    //     "Buy groceries",
    //     "Milk, bread, and eggs",
    //     response.rows[0].id,
    //     false,
    //   ];
    //   await client.query(insertTodoText, todoValues);
    console.log("Entries created!");
  } catch (error: any) {
    console.log(error.message, error);
  }
}

createEntries();
