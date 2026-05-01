import { Schema, model, Document } from "mongoose";

export interface DashboardStateDocument extends Document {
  parkingBrake: boolean;
  checkEngine: boolean;
  motorStatus: boolean;
  batteryLow: boolean;

  power: number;
  rpm: number;

  gearRatio: string;
  batteryPercent: number;
  batteryTemperature: number;
  motorRpmDisplay: number;

  motorSpeedSetting: number;
  isCharging: boolean;

  updatedAt: Date;
}

const dashboardStateSchema = new Schema<DashboardStateDocument>(
  {
    parkingBrake: { type: Boolean, required: true, default: false },
    checkEngine: { type: Boolean, required: true, default: false },
    motorStatus: { type: Boolean, required: true, default: false },
    batteryLow: { type: Boolean, required: true, default: false },

    power: { type: Number, required: true, default: 0 },
    rpm: { type: Number, required: true, default: 0 },

    gearRatio: { type: String, required: true, default: "N/N" },
    batteryPercent: { type: Number, required: true, default: 78 },
    batteryTemperature: { type: Number, required: true, default: 33 },
    motorRpmDisplay: { type: Number, required: true, default: 0 },

    motorSpeedSetting: { type: Number, required: true, default: 0, min: 0, max: 4 },
    isCharging: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
);

export const DashboardState = model<DashboardStateDocument>(
  "DashboardState",
  dashboardStateSchema
);
