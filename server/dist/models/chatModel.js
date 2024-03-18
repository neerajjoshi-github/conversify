"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    chatName: {
        type: String,
        required: true,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latestMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    imageURL: {
        type: String,
    },
}, {
    timestamps: true,
});
var ChatModel = (0, mongoose_1.model)("Chat", chatSchema);
exports.default = ChatModel;
