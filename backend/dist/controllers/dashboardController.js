"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCharging = exports.updateMotorSpeed = exports.patchDashboard = exports.getDashboard = void 0;
const dashboardService_1 = require("../services/dashboardService");
const getDashboard = async (_req, res) => {
    const state = await (0, dashboardService_1.getOrCreateDashboardState)();
    res.json(state);
};
exports.getDashboard = getDashboard;
const patchDashboard = async (req, res) => {
    const state = await (0, dashboardService_1.updateDashboardState)(req.body);
    res.json(state);
};
exports.patchDashboard = patchDashboard;
const updateMotorSpeed = async (req, res) => {
    const { motorSpeedSetting } = req.body;
    if (typeof motorSpeedSetting !== "number") {
        res.status(400).json({ message: "motorSpeedSetting must be a number from 0 to 4" });
        return;
    }
    const state = await (0, dashboardService_1.updateDashboardState)({ motorSpeedSetting });
    res.json(state);
};
exports.updateMotorSpeed = updateMotorSpeed;
const updateCharging = async (req, res) => {
    const { isCharging } = req.body;
    if (typeof isCharging !== "boolean") {
        res.status(400).json({ message: "isCharging must be true or false" });
        return;
    }
    const state = await (0, dashboardService_1.updateDashboardState)({ isCharging });
    res.json(state);
};
exports.updateCharging = updateCharging;
