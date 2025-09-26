import express from "express";

const app = express();
app.use(express.json());

let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  next();
});

app.get("/user", (req, res) => {
  res.json({ name: "John" });
});

app.post("/user", (req, res) => {
  res.json({ msg: "Dummy User Created Successfully" });
});

app.get("/requestCount", (req, res) => {
  res.json({ requestCount });
});

app.listen(3000, "PORT: 3000");
