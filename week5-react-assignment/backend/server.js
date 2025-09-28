import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(3000, "Server Listening On Port 3000!");
