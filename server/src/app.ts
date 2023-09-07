import express, { NextFunction, Request, Response } from "express";
const app = express();
import { createServer } from "http";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes";

const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);

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
