export interface DashboardState {
  _id: string;

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

  createdAt: string;
  updatedAt: string;
}
