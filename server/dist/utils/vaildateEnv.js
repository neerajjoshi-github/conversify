"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var envalid_1 = require("envalid");
var validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MONGODB_CONNECTION_URL: (0, validators_1.str)(),
    PORT: (0, validators_1.port)(),
    JWT_SECRET: (0, validators_1.str)(),
});
