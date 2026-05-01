import { Router } from "express";
import {
  getDashboard,
  patchDashboard,
  updateCharging,
  updateMotorSpeed
} from "../controllers/dashboardController";

export const dashboardRouter = Router();

dashboardRouter.get("/", getDashboard);
dashboardRouter.patch("/", patchDashboard);
dashboardRouter.patch("/speed", updateMotorSpeed);
dashboardRouter.patch("/charging", updateCharging);
