"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromGrouop = exports.addToGroup = exports.updateGroupChat = exports.createGroupChat = exports.fetchUserChats = exports.acccessChat = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var chatModel_1 = __importDefault(require("../models/chatModel"));
var userModel_1 = __importDefault(require("../models/userModel"));
var acccessChat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, memberUserId, chat, chatData, createdChat, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                memberUserId = req.body.memberUserId;
                console.log("BODY DATA FROM ACCESS CHAT : ", req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                if (!memberUserId)
                    throw (0, http_errors_1.default)(404, "You need atleast one more participant to create a chat.");
                return [4 /*yield*/, chatModel_1.default.find({
                        isGroupChat: false,
                        $and: [
                            { members: { $elemMatch: { $eq: userId } } },
                            { members: { $elemMatch: { $eq: memberUserId } } },
                        ],
                    })
                        .populate("members", "-password")
                        .populate({
                        path: "latestMessage",
                        populate: {
                            path: "sender",
                            select: "usename imageURL email",
                        },
                    })];
            case 2:
                chat = _a.sent();
                if (!(chat.length > 0)) return [3 /*break*/, 3];
                res.status(200).json({
                    success: true,
                    message: "Chat found successfully!!",
                    data: chat[0],
                });
                return [3 /*break*/, 6];
            case 3:
                chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    members: [userId, memberUserId],
                };
                return [4 /*yield*/, chatModel_1.default.create(chatData)];
            case 4: return [4 /*yield*/, (_a.sent()).populate("members", "-password")];
            case 5:
                createdChat = _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Chat created successfully!!",
                    data: createdChat,
                });
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.acccessChat = acccessChat;
var fetchUserChats = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, chats, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.body.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, chatModel_1.default.find({
                        members: { $elemMatch: { $eq: userId } },
                    })
                        .populate("members", "-password")
                        .populate("groupAdmin", "-password")
                        .populate({
                        path: "latestMessage",
                        populate: {
                            path: "sender",
                            select: "usename imageURL email",
                        },
                    })
                        .sort({ updatedAt: -1 })];
            case 2:
                chats = _a.sent();
                res.status(200).json({
                    success: true,
                    message: "User chats found successfully!!",
                    data: chats,
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchUserChats = fetchUserChats;
var createGroupChat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, chatName, members, imageURL, createdGroupChat, data, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.userId;
                _a = req.body, chatName = _a.chatName, members = _a.members, imageURL = _a.imageURL;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!chatName || !members) {
                    throw (0, http_errors_1.default)(404, "Please fill all the required fields.");
                }
                if (members.length < 2)
                    throw (0, http_errors_1.default)(404, "At least 2 more members are required other than you to form a group!!");
                return [4 /*yield*/, chatModel_1.default.create({
                        isGroupChat: true,
                        groupAdmin: userId,
                        members: __spreadArray([userId], members, true),
                        chatName: chatName,
                        imageURL: imageURL,
                    })];
            case 2:
                createdGroupChat = _b.sent();
                return [4 /*yield*/, chatModel_1.default.findById(createdGroupChat._id)
                        .populate("members", "-password")
                        .populate("groupAdmin", "-password")];
            case 3:
                data = _b.sent();
                res.status(200).json({
                    success: true,
                    data: data,
                    message: "Group created successfully!!",
                });
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createGroupChat = createGroupChat;
var updateGroupChat = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newChatName, chatId, chat, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, newChatName = _a.newChatName, chatId = _a.chatId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!newChatName) {
                    throw (0, http_errors_1.default)(404, "Please provide a valid name.");
                }
                return [4 /*yield*/, chatModel_1.default.findByIdAndUpdate(chatId, {
                        chatName: newChatName,
                    }, {
                        new: true,
                    })
                        .populate("members", "-password")
                        .populate("groupAdmin", "-password")];
            case 2:
                chat = _b.sent();
                if (!chat) {
                    throw (0, http_errors_1.default)(404, "Invalid request!! No chat exist with this id!!");
                }
                res.status(200).json({
                    success: true,
                    data: chat,
                    message: "Group updated successfully!!",
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateGroupChat = updateGroupChat;
var addToGroup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, memberId, chatId, memeber, chat, alreadyAMember, updatedChat, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, memberId = _a.memberId, chatId = _a.chatId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_1.default.findById(memberId)];
            case 2:
                memeber = _b.sent();
                if (!memeber)
                    throw (0, http_errors_1.default)(400, "User does not exist!!");
                return [4 /*yield*/, chatModel_1.default.findById(chatId)];
            case 3:
                chat = _b.sent();
                if (!chat)
                    throw (0, http_errors_1.default)(400, "Chat does not exist!!");
                alreadyAMember = !!chat.members.find(function (existingMember) {
                    return existingMember.equals(memberId);
                });
                if (alreadyAMember) {
                    throw (0, http_errors_1.default)(400, "User is already a member of this group.");
                }
                return [4 /*yield*/, chatModel_1.default.findByIdAndUpdate(chatId, {
                        $push: { members: memeber._id },
                    }, { new: true })
                        .populate("members", "-password")
                        .populate("groupAdmin", "-password")];
            case 4:
                updatedChat = _b.sent();
                res.status(200).json({
                    success: true,
                    data: updatedChat,
                    message: "Added new member successfully!",
                });
                return [3 /*break*/, 6];
            case 5:
                error_5 = _b.sent();
                next(error_5);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addToGroup = addToGroup;
var removeFromGrouop = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, memberId, chatId, memeber, updatedChat, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, memberId = _a.memberId, chatId = _a.chatId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userModel_1.default.findById(memberId)];
            case 2:
                memeber = _b.sent();
                if (!memeber)
                    throw (0, http_errors_1.default)(400, "User does not exist!!");
                return [4 /*yield*/, chatModel_1.default.findByIdAndUpdate(chatId, {
                        $pull: { members: memeber._id },
                    }, { new: true })
                        .populate("members", "-password")
                        .populate("groupAdmin", "-password")];
            case 3:
                updatedChat = _b.sent();
                if (!updatedChat)
                    throw (0, http_errors_1.default)(400, "Chat does not exist!!");
                res.status(200).json({
                    success: true,
                    data: updatedChat,
                    message: "Removed member successfully!",
                });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _b.sent();
                next(error_6);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeFromGrouop = removeFromGrouop;
