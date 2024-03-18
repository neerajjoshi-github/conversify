"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var cors_1 = __importDefault(require("cors"));
var http_errors_1 = __importStar(require("http-errors"));
var socket_io_1 = require("socket.io");
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
var messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
var authMiddleware_1 = require("./middleware/authMiddleware");
var app = (0, express_1.default)();
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", function (socket) {
    socket.on("setup", function (userData) {
        console.log("😃 USER CONNECTED TO SOCKET WITH ID : ", userData.userId);
        socket.join(userData.userId);
        socket.emit("connected");
    });
    socket.on("join chat", function (room) {
        socket.join(room._id);
        console.log("🎈 USER JOINED THE CHAT ROOM WITH THE ROOM ID", room._id);
    });
    socket.on("typing", function (roomId) {
        console.log("SOMEONE IS TYPING IN ROOM  WITH ROOM ID : ", roomId);
        return socket.in(roomId).emit("typing");
    });
    socket.on("stopedTyping", function (roomId) { return socket.in(roomId).emit("stopedTyping"); });
    socket.on("new message", function (newMessageRecieved) {
        console.log("📨 NEW MESSAGE RECIEVED : ", newMessageRecieved.content);
        var chat = newMessageRecieved.chat;
        if (!chat.members)
            return console.log("Chat users are not defiend  on socket new message");
        chat.members.forEach(function (user) {
            if (user._id == newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", authMiddleware_1.authMiddleware, userRoutes_1.default);
app.use("/api/chats", authMiddleware_1.authMiddleware, chatRoutes_1.default);
app.use("/api/messages", authMiddleware_1.authMiddleware, messageRoutes_1.default);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404, "Page not found!!!"));
});
app.use(function (error, req, res, next) {
    console.log("Error in error handler", error);
    var errorMessage = "An unknow error occurred";
    var statusCode = 500;
    if ((0, http_errors_1.isHttpError)(error)) {
        errorMessage = error.message;
        statusCode = error.status;
    }
    res
        .status(statusCode)
        .json({ message: errorMessage, data: null, success: false });
});
exports.default = server;
