"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var messageControllers_1 = require("../controllers/messageControllers");
var router = (0, express_1.Router)();
router.post("/", messageControllers_1.sendMessage);
router.get("/chat/:chatId", messageControllers_1.getAllMessagesForAChat);
exports.default = router;
