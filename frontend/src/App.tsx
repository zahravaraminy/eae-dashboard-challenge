import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Battery,
  BatteryCharging,
  BatteryLow,
  CircleParking,
  Gauge as GaugeIcon,
  Settings,
  Thermometer,
  Zap
} from "lucide-react";

import { DashboardState } from "./types/DashboardState";
import {
  getDashboardState,
  updateCharging,
  updateMotorSpeed
} from "./services/dashboardApi";
import { Gauge } from "./components/Gauge";
import { Indicator } from "./components/Indicator";
import { InfoTile } from "./components/InfoTile";

export default function App() {
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [error, setError] = useState<string>("");

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardState();
      setDashboard(data);
      setError("");
    } catch {
      setError("Could not connect to backend. Make sure backend is running.");
    }
  };

  useEffect(() => {
    fetchDashboard();

    const intervalId = window.setInterval(() => {
      fetchDashboard();
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleSpeedChange = async (value: number) => {
    try {
      const updated = await updateMotorSpeed(value);
      setDashboard(updated);
    } catch {
      setError("Failed to update motor speed.");
    }
  };

  const handleChargingToggle = async () => {
    if (!dashboard) {
      return;
    }

    try {
      const updated = await updateCharging(!dashboard.isCharging);
      setDashboard(updated);
    } catch {
      setError("Failed to update charging status.");
    }
  };

  if (!dashboard) {
    return (
      <main className="page">
        <div className="loading">Loading dashboard...</div>
        {error && <p className="error">{error}</p>}
      </main>
    );
  }

  return (
    <main className="page">
      <section className="dashboard">
        <header className="dashboard-header">
          <h1>EAE Vehicle Dashboard</h1>
          <p>Live data from MongoDB through Node.js backend</p>
        </header>

        {error && <p className="error">{error}</p>}

        <section className="top-row">
          <Indicator label="Parking Brake" active={dashboard.parkingBrake}>
            <CircleParking />
          </Indicator>

          <Indicator label="Check Engine" active={dashboard.checkEngine}>
            <AlertTriangle />
          </Indicator>

          <Indicator label="Motor Status" active={dashboard.motorStatus}>
            <Zap />
          </Indicator>

          <Indicator label="Battery Low" active={dashboard.batteryLow}>
            <BatteryLow />
          </Indicator>
        </section>

        <section className="gauge-row">
          <Gauge
            title="Power Gauge"
            value={dashboard.power}
            min={0}
            max={1000}
            unit="kW"
          />

          <Gauge
            title="Motor RPM Gauge"
            value={dashboard.rpm}
            min={0}
            max={850}
            unit="RPM"
          />
        </section>

        <section className="middle-row">
          <InfoTile
            icon={<Settings />}
            label="Gear Ratio"
            value={dashboard.gearRatio}
          />

          <InfoTile
            icon={<Battery />}
            label="Battery"
            value={`${dashboard.batteryPercent}%`}
          />

          <InfoTile
            icon={<Thermometer />}
            label="Temperature"
            value={`${dashboard.batteryTemperature}°C`}
          />

          <InfoTile
            icon={<GaugeIcon />}
            label="Motor RPM"
            value={`${dashboard.motorRpmDisplay} RPM`}
          />

          <div className="speed-control">
            <h2>Motor Speed Setting</h2>
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={dashboard.motorSpeedSetting}
              onChange={(event) => handleSpeedChange(Number(event.target.value))}
            />
            <div className="speed-labels">
              <span>OFF</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </div>
          </div>
        </section>

        <section className="bottom-row">
          <button type="button" className="nav-button">
            Gear / Motor / Battery View
          </button>

          <button type="button" className="nav-button">
            View Menu
          </button>

          <button
            type="button"
            className={`charging-button ${dashboard.isCharging ? "charging" : ""}`}
            onClick={handleChargingToggle}
          >
            <BatteryCharging />
            {dashboard.isCharging ? "Charging" : "Connect Charger"}
          </button>
        </section>
      </section>
    </main>
  );
}
