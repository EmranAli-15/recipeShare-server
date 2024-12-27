"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const recipe_route_1 = require("./app/modules/recipe/recipe.route");
const user_route_1 = require("./app/modules/user/user.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
// app.use(cors({
//   origin: 'https://foodrecipe-client.vercel.app',  // The address of client
//   // origin: 'http://localhost:3000',  // The address of client
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
const allowedOrigins = ['http://localhost:3000', 'https://foodrecipe-client.vercel.app'];
exports.app.use((0, cors_1.default)({
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
// -----ROUTES START----- //
exports.app.use('/api', auth_route_1.authRoutes);
exports.app.use('/api', recipe_route_1.recipeRoutes);
exports.app.use('/api', user_route_1.userRoutes);
// -----ROUTES END----- //
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
});
exports.app.use(globalErrorHandler_1.default);
