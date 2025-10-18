import express from "express";

const app = express();

app.get("/", (req, res) => {
   res.status(200).send("Yooooo")
});

app.listen(3000, () => console.log("Server!!!"));
