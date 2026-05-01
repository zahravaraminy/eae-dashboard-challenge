"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardState = void 0;
const mongoose_1 = require("mongoose");
const dashboardStateSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true
});
exports.DashboardState = (0, mongoose_1.model)("DashboardState", dashboardStateSchema);
