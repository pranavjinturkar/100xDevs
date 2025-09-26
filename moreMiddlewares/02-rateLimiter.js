import express from "express";

const app = express();

app.use(express.json());

let numberOfRequestForUser = {};
setInterval(() => {
  numberOfRequestForUser = {};
}, 2000);

app.use((req, res, next) => {
  const user_id = req.headers["user-id"];
  if (numberOfRequestForUser[user_id]) {
    numberOfRequestForUser[user_id] += 1;
    if (numberOfRequestForUser[user_id] > 5) {
      return res.status(404).json({ msg: "No entry" });
    } else {
      next();
    }
  } else {
    numberOfRequestForUser = 1;
    next();
  }
});

app.get("/user", (req, res) => {
  res.json({ name: "John" });
});

app.post("/user", (req, res) => {
  res.json({ msg: "Dummy User Created Successfully" });
});

app.listen(3000, () => console.log("Port 3000!"));
