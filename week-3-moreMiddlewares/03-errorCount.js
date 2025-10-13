import express from "express";

const app = express();

app.use(express.json());

let errCount = 0;

app.get("/user", (req, res) => {
  res.json({ name: "John" });
});

app.post("/user", (req, res) => {
  res.json({ msg: "Dummy User Created Successfully" });
});

app.get("/err-count", (req, res) => {
  res.json({ errCount });
});

app.use((err, req, res, next) => {
  console.log(err);
  errCount++;
  res.status(404).json({ message: "Server is Down... Please Try again later" });
});

app.listen(3000, () => console.log("Port 3000!"));
