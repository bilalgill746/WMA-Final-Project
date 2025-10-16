import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const httpServer = createServer(handler);

let onlineUsers = [];
const addUser = (username, socketId) => {
  const isExist = onlineUsers.find((user) => user.socketId === socketId);
  if (!isExist) {
    onlineUsers.push({ username, socketId });
    console.log(username + "added!");
  }
};
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  console.log("user removed!");
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

const io = new Server(httpServer);
const userSocketMap = {};

// const getRecieverSocketId = (recieverId) => userSocketMap[recieverId];

// export { getRecieverSocketId, io };
app.prepare().then(() => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on("newUser", (username) => {
      addUser(username, socket.id);
    });

    socket.on("registerUser", (userId) => {
      if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User registered: ${userId}, SocketId: ${socket.id}`);
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
    socket.on("unregisterUser", (userId) => {
      if (userId && userSocketMap[userId]) {
        console.log(`User unregistered: ${userId}, SocketId: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
      // Find and remove the user from the map
      const userId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userId) {
        console.log(`User disconnected: ${userId}, SocketId: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
