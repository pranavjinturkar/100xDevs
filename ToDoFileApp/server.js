import express from "express";
import fs from "fs";

async function generateId() {
  const allTodos = await getAllTodos();
  const id = allTodos[allTodos.length - 1].id;
  return id + 1;
}
async function getParticularTodo(id) {
  const allTodos = await getAllTodos();
  return allTodos.filter((item) => item.id === id);
}

async function getAllTodos() {
  const data = await fs.promises.readFile("todos.json", "utf8");
  return JSON.parse(data);
}

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  // fs.promises.readFile("todos.json", "utf8", (err, data) => {
  //   if (err) throw new Error(err);
  //   // console.log(typeof data);
  //   // console.log(data)
  //   allTodos = JSON.parse(data);
  //   todo = data;
  //   console.log("In file", allTodos);
  // });
  // console.log("Outside File", allTodos);
  // res.status(200).json();

  // fs.promises.readFile => asynchronous function which need to use async-await/promises to deal with
  // also above res.json() is being sent synchronously... at the time it is being sent... fs.readfile does not readfiles at that speed that's why it goes is in backseat until the main thread do further processes, that's why response is being sent...

  const allTodos = await getAllTodos();
  res.status(200).json(allTodos);
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({
      message: "TodoId is required",
      success: false,
    });

  const currentTodo = await getParticularTodo(parseInt(id));
  if (currentTodo.length === 0)
    return res.status(404).json({
      message: "Todo for this Id not found",
      success: false,
    });

  res.status(200).json(currentTodo[0]);
});

app.post("/todos", async (req, res) => {
  const { name, description, completed = false } = req.body;

  if (!name || !description)
    return res.status(400).json({
      message: "Name and Description of Todo are missing",
      success: false,
    });

  const allTodos = await getAllTodos();

  allTodos.push({
    id: await generateId(),
    name,
    description,
    completed,
  });

  await fs.promises.writeFile(
    "todos.json",
    JSON.stringify(allTodos, null, 2),
    "utf-8"
  );

  res.status(201).json({
    message: "Todo Created Successfully",
    success: true,
  });
});

app.put("/todos/:id", async (req, res) => {
  const { title, description, completed } = req.body;
  const id = req.params.id;

  if (!id)
    return res.status(400).json({
      message: "Todo Id is required",
      success: false,
    });

  // if (
  //   title.trim.length === 0 &&
  //   description.trim.length === 0 &&
  //   completed == undefined
  // ) {
  //   return res.status(400).json({
  //     message: "Please provide any of the fields to update the todo",
  //     success: false,
  //   });
  // }

  const currentTodo = await getParticularTodo(parseInt(id));
  if (currentTodo.length === 0)
    return res.status(404).json({
      message: "Todo for this Id not found",
      success: false,
    });

  if (title != undefined) {
    currentTodo[0].name = title;
  }
  if (description != undefined) {
    currentTodo[0].description = description;
  }
  if (completed != undefined) {
    currentTodo[0].completed = completed;
  }

  let allTodos = await getAllTodos();

  allTodos = allTodos.map((todo) => (todo.id == id ? currentTodo[0] : todo));

  await fs.promises.writeFile(
    "todos.json",
    JSON.stringify(allTodos, null, 2),
    "utf-8"
  );

  res.status(200).json({
    message: "Todo Updated Successfully",
    success: true,
  });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({
      message: "Todo Id is required",
      success: false,
    });
  const currentTodo = await getParticularTodo(parseInt(id));
  if (currentTodo.length === 0)
    return res.status(400).json({
      message: "No Todo found for this Id",
      success: false,
    });

  let allTodos = await getAllTodos();
  allTodos = allTodos.filter((todo) => todo.id != id);

  await fs.promises.writeFile(
    "todos.json",
    JSON.stringify(allTodos, null, 2),
    "utf-8"
  );

  res.status(200).json({
    message: "Todo Deleted Successfully",
    success: true,
  });
});

// Route Not Found (Middleware)
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => console.log("Server running on port 3000!"));
