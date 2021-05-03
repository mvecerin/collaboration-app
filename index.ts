import { Request, Response } from "express";
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
let path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./server/routes/index.ts");
const errorMiddleware = require("./server/middleware/errorMiddleware");

// Socket.io
import { createServer } from "http";
import { Server } from "socket.io";
import { onConnection } from "./server/utils/socket";
const httpServer = createServer(app);
const io = new Server(httpServer, {});
io.on("connection", onConnection);
app.set("socketio", io);

// DB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected..."))
  .catch(console.log);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "client", "build")));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Routers
app.use("/api", indexRouter);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "client", "build", "index.html"));
});

app.use(errorMiddleware);

// Start
const port = process.env.PORT || 5000;
httpServer.listen(port, () => console.log(`Running on port ${port}`));
