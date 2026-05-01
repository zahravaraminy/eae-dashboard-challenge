import { DashboardState } from "../types/DashboardState";

const API_BASE_URL = "http://localhost:5000/api/dashboard";

export const getDashboardState = async (): Promise<DashboardState> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard state");
  }

  return response.json();
};

export const updateMotorSpeed = async (
  motorSpeedSetting: number
): Promise<DashboardState> => {
  const response = await fetch(`${API_BASE_URL}/speed`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ motorSpeedSetting })
  });

  if (!response.ok) {
    throw new Error("Failed to update motor speed");
  }

  return response.json();
};

export const updateCharging = async (
  isCharging: boolean
): Promise<DashboardState> => {
  const response = await fetch(`${API_BASE_URL}/charging`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ isCharging })
  });

  if (!response.ok) {
    throw new Error("Failed to update charging state");
  }

  return response.json();
};
