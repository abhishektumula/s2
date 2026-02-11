import { Scope_One } from "next/font/google";
import { WebSocketServer, WebSocket } from "ws";

let allsockets: WebSocket[] = [];

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", (socket) => {
  allsockets.push(socket);
  console.log("new user connected!");

  socket.on("message", (msg: string) => {
    console.log("[socket] Received: ", msg.toString());
    if (allsockets.length != 1) {
      for (let i = 0; i < allsockets.length; i++) {
        let curr = allsockets[i];
        if (curr != socket) {
          curr.send(msg.toString());
        }
      }
    }
  });

  socket.on("disconnect", () => {
    allsockets = allsockets.filter((s) => s !== socket);
  });

  socket.on("close", () => {
    allsockets = allsockets.filter((s) => s !== socket);
  });
});
