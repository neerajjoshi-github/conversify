"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("./app"));
var vaildateEnv_1 = __importDefault(require("./utils/vaildateEnv"));
var port = vaildateEnv_1.default.PORT;
var mongodbConnectionURL = vaildateEnv_1.default.MONGODB_CONNECTION_URL;
mongoose_1.default
    .connect(mongodbConnectionURL)
    .then(function () {
    console.log("Database connected!!");
    app_1.default.listen(port, function () {
        console.log("Server listening on port ".concat(port));
    });
})
    .catch(function (error) {
    console.log("Error while connecting to database!!!", error);
});
