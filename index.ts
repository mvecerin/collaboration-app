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

const http = require("http").createServer(app);
const io = require("socket.io")(http);

// io.on("connection", (socket) => {
//   console.log(`${socket.id} connected`);
//   socket.broadcast.emit("user connected", {
//     userId: socket.id,
//     name: socket.name,
//   });
//   // socket.onclose, rooms, sids?, connected, disconnected, auth
//   // socket.on('joinGroup', ({userJoinedId, groupId}) => {
//   //     console.log(userJoinedId, groupId);
//   //     joinUser(userJoinedId, groupId);
//   // })
//   socket.on("disconnect", () => {
//     console.log(`${socket.id} disconnected`);
//   });
// });

// io.use((socket, next) => {
//     const name = socket.handshake.auth.name;
//     if(!name) {
//         return next(new Error('No name'));
//     }
//     socket.name = name;
//     next();
// });

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
app.use(express.static(__dirname + "/public/app"));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

// Routers
app.use("/api", indexRouter);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/app"));
// });

app.use(errorMiddleware);

// Start
http.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
