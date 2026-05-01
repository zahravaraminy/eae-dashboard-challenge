import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import { dashboardRouter } from "./routes/dashboardRoutes";
import { simulateDashboardValues } from "./services/dashboardService";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eae_dashboard";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "EAE dashboard backend is running" });
});

app.use("/api/dashboard", dashboardRouter);

const startServer = async (): Promise<void> => {
  await connectDatabase(MONGODB_URI);

  setInterval(() => {
    simulateDashboardValues().catch((error) => {
      console.error("Simulation error:", error);
    });
  }, 1000);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
