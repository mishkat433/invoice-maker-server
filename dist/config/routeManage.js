"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("../routes/userRoutes");
const authRoutes_1 = require("../routes/authRoutes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: authRoutes_1.authRoutes,
    }
];
moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
exports.default = router;
