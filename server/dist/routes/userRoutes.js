"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userControllers_1 = require("../controllers/userControllers");
var router = (0, express_1.Router)();
router.get("/", userControllers_1.getUsersWithUsernameOrEmail);
exports.default = router;
