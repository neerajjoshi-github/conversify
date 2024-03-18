"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chatControllers_1 = require("../controllers/chatControllers");
var router = (0, express_1.default)();
router.post("/", chatControllers_1.acccessChat);
router.get("/", chatControllers_1.fetchUserChats);
router.post("/group", chatControllers_1.createGroupChat);
router.put("/group", chatControllers_1.updateGroupChat);
router.put("/group/add", chatControllers_1.addToGroup);
router.put("/group/remove", chatControllers_1.removeFromGrouop);
exports.default = router;
