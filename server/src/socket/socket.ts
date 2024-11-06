import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
        credentials: true
    }
});

interface socketMap {
    [key: number]: any
}

const userSocketMap: socketMap = {};

const getReceiverSocketId = (id: number) => {
    return userSocketMap[id];
}

io.on('connection', (socket) => {
    console.log('User joined with socket id', socket.id);
    // from frontend we will send query
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") {
        //@ts-ignore
        userSocketMap[userId] = socket.id;
    }
    socket.on('disconnect', () => {
        console.log('User disconnected with socket id', socket.id);
        //@ts-ignore
        delete userSocketMap[userId];
    })
})

export { io, server, app};
export default getReceiverSocketId;