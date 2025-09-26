import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

// Admin Routes
app.use("/admin", adminRoutes);
// User Routes
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server Running on PORT 3000"));
