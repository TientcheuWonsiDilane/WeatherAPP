import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import { getWeather, getCity } from "./controllers/controller.js";
const app= express();
app.use(cors());
app.use(express.json())

app.get("/api/weather/:city", getWeather);
app.get("/api/cities/:city", getCity);

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})