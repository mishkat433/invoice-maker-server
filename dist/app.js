"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routeManage_1 = __importDefault(require("./config/routeManage"));
const globalErrorHandler_1 = __importDefault(require("./error/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import httpStatus from 'http-status';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev')); //this package using we can see reqMethod, response code and response time
app.use('/api/v1', routeManage_1.default);
app.use(globalErrorHandler_1.default);
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.status(httpStatus.NOT_FOUND).json({
//         success: false,
//         message: 'Not Found',
//         errorMessage: [{
//             path: req.originalUrl,
//             message: 'API not found'
//         }]
//     })
//     next()
// })
app.get('/', (req, res) => {
    res.send('Server is running');
});
exports.default = app;
