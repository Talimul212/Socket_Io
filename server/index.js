const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connect :${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  //spacieficy person can be see the message
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  //all can be see the message
  //   socket.on("send_message", (data) => {
  //     socket.broadcast.emit("receive_message", data);
  //   });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
