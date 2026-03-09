import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRoutes from "./routes/restaurantRoutes";
import { requestLogger } from "./middleware/requestLogger";
import { register } from "./metrics/prometheus";
import os from "os";
import { restaurants } from "./data/restaurants";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/", restaurantRoutes);

app.get("/health", (req, res) => {

  res.json({
    status: "UP",
    service: process.env.SERVICE_NAME,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    restaurantsLoaded: restaurants.length,
    timestamp: new Date().toISOString()
  });

});

app.get("/metrics", async (req, res) => {

  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Restaurant service running on port ${PORT}`);
});