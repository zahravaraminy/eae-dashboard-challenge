"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const dashboardRoutes_1 = require("./routes/dashboardRoutes");
const dashboardService_1 = require("./services/dashboardService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eae_dashboard";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
app.use((0, cors_1.default)({ origin: FRONTEND_URL }));
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    res.json({ status: "ok", message: "EAE dashboard backend is running" });
});
app.use("/api/dashboard", dashboardRoutes_1.dashboardRouter);
const startServer = async () => {
    await (0, database_1.connectDatabase)(MONGODB_URI);
    setInterval(() => {
        (0, dashboardService_1.simulateDashboardValues)().catch((error) => {
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
