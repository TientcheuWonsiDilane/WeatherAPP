import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { getWeather, getCity } from "./controllers/controller.js";
const app = express();
app.use(
  cors({
    origin: "https://weatherapp-2-g5n6.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/weather/:city", getWeather);
app.get("/api/cities/:city", getCity);
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ready" });
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
