"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var vaildateEnv_1 = __importDefault(require("./vaildateEnv"));
var generateJWT = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, vaildateEnv_1.default.JWT_SECRET, { expiresIn: "15d" });
};
exports.generateJWT = generateJWT;
