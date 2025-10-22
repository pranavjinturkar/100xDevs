import express from "express";
import surveyRoutes from "./routes/surveyRoutes";

const app = express();

app.use(express.json());

app.use("/api/survey", surveyRoutes)

app.listen(3000, () => console.log("Server Running on Port 3000!"));
