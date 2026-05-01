"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateDashboardValues = exports.updateDashboardState = exports.getOrCreateDashboardState = void 0;
const DashboardState_1 = require("../models/DashboardState");
const clamp = (value, min, max) => {
    return Math.min(Math.max(value, min), max);
};
const getOrCreateDashboardState = async () => {
    let state = await DashboardState_1.DashboardState.findOne();
    if (!state) {
        state = await DashboardState_1.DashboardState.create({
            parkingBrake: false,
            checkEngine: false,
            motorStatus: false,
            batteryLow: false,
            power: 0,
            rpm: 0,
            gearRatio: "N/N",
            batteryPercent: 78,
            batteryTemperature: 33,
            motorRpmDisplay: 0,
            motorSpeedSetting: 0,
            isCharging: false
        });
    }
    return state;
};
exports.getOrCreateDashboardState = getOrCreateDashboardState;
const updateDashboardState = async (updates) => {
    const state = await (0, exports.getOrCreateDashboardState)();
    if (typeof updates.parkingBrake === "boolean") {
        state.parkingBrake = updates.parkingBrake;
    }
    if (typeof updates.checkEngine === "boolean") {
        state.checkEngine = updates.checkEngine;
    }
    if (typeof updates.motorSpeedSetting === "number") {
        state.motorSpeedSetting = clamp(Math.round(updates.motorSpeedSetting), 0, 4);
    }
    if (typeof updates.isCharging === "boolean") {
        state.isCharging = updates.isCharging;
    }
    await state.save();
    return state;
};
exports.updateDashboardState = updateDashboardState;
const simulateDashboardValues = async () => {
    const state = await (0, exports.getOrCreateDashboardState)();
    const speed = state.motorSpeedSetting;
    let targetRpm = speed * 200;
    if (speed === 0) {
        targetRpm = 0;
    }
    const noise = speed > 0 ? Math.round(Math.random() * 50 - 25) : 0;
    const nextRpm = clamp(targetRpm + noise, 0, 850);
    state.rpm = nextRpm;
    state.motorRpmDisplay = nextRpm;
    state.power = Math.round((nextRpm / 850) * 1000);
    if (state.isCharging) {
        state.batteryPercent = clamp(state.batteryPercent + 1, 0, 100);
        state.batteryTemperature = clamp(state.batteryTemperature + 0.1, 20, 45);
    }
    else if (speed > 0) {
        state.batteryPercent = clamp(state.batteryPercent - speed * 0.2, 0, 100);
        state.batteryTemperature = clamp(state.batteryTemperature + speed * 0.1, 20, 60);
    }
    else {
        state.batteryTemperature = clamp(state.batteryTemperature - 0.1, 20, 60);
    }
    state.batteryPercent = Number(state.batteryPercent.toFixed(1));
    state.batteryTemperature = Number(state.batteryTemperature.toFixed(1));
    state.batteryLow = state.batteryPercent < 20;
    state.motorStatus = state.rpm > 700;
    state.checkEngine = state.batteryTemperature > 55 || state.rpm > 820;
    await state.save();
};
exports.simulateDashboardValues = simulateDashboardValues;
