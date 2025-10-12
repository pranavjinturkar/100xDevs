import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/notifications", async (req, res) => {
  console.log("Server Called");
  const notifications = Math.floor(Math.random() * 50);
  const messaging = Math.floor(Math.random() * 30);
  const network = Math.floor(Math.random() * 80);
  const jobs = Math.floor(Math.random() * 50);
  await new Promise((r) => setTimeout(r, 1000));
  res.status(200).json({
    network,
    jobs,
    messaging,
    notifications,
  });
});

app.listen(3000, () => console.log("Server running on port 3000!"));
