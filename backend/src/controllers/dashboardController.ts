import { Request, Response } from "express";
import {
  getOrCreateDashboardState,
  updateDashboardState
} from "../services/dashboardService";

export const getDashboard = async (_req: Request, res: Response): Promise<void> => {
  const state = await getOrCreateDashboardState();
  res.json(state);
};

export const patchDashboard = async (req: Request, res: Response): Promise<void> => {
  const state = await updateDashboardState(req.body);
  res.json(state);
};

export const updateMotorSpeed = async (req: Request, res: Response): Promise<void> => {
  const { motorSpeedSetting } = req.body;

  if (typeof motorSpeedSetting !== "number") {
    res.status(400).json({ message: "motorSpeedSetting must be a number from 0 to 4" });
    return;
  }

  const state = await updateDashboardState({ motorSpeedSetting } as never);
  res.json(state);
};

export const updateCharging = async (req: Request, res: Response): Promise<void> => {
  const { isCharging } = req.body;

  if (typeof isCharging !== "boolean") {
    res.status(400).json({ message: "isCharging must be true or false" });
    return;
  }

  const state = await updateDashboardState({ isCharging } as never);
  res.json(state);
};
