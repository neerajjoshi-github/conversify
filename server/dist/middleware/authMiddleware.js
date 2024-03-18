"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var http_errors_1 = __importDefault(require("http-errors"));
var vaildateEnv_1 = __importDefault(require("../utils/vaildateEnv"));
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw (0, http_errors_1.default)(404, "Invaild request!! You have to be logged in to proceeded!!");
        }
        var decryptedData = jsonwebtoken_1.default.verify(token, vaildateEnv_1.default.JWT_SECRET);
        req.body.userId = decryptedData.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
