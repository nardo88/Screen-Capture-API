import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors({}));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  serveClient: false,
});

io.on("connection", (socket: Socket) => {
  console.log("connect");
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "success" });
});

server.listen(5000, () => {
  console.log("server started");
});
