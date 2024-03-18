"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        trim: true,
        required: true,
    },
    chat: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
}, {
    timestamps: true,
});
var MessageModel = (0, mongoose_1.model)("Message", messageSchema);
exports.default = MessageModel;
