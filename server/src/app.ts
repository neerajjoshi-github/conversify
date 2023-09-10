import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("SOCKET CONNECTED");
  socket.on("setup", (userData) => {
    socket.join(userData.userId);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("USER JOINED THE CHAT ROOM", room);
  });
  socket.on("new message", (newMessageRecieved) => {
    console.log("NEW MESSAGE : ", newMessageRecieved);
    let chat = newMessageRecieved.chat;
    if (!chat.members)
      return console.log("Chat users are not defiend  on socket new message");
    chat.members.forEach((user: any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/chats", authMiddleware, chatRoutes);
app.use("/api/messages", authMiddleware, messageRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Page not found!!!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log("Error in error handler", error);
  let errorMessage = "An unknow error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res
    .status(statusCode)
    .json({ message: errorMessage, data: null, success: false });
});

export default server;
