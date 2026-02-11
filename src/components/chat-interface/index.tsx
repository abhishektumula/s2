"use client";
import { useEffect, useState, useRef } from "react";
export type messageType = {
  username: string;
  message: string;
};

export const ChatInterface = ({
  adminUser,
}: {
  adminUser: string | null | undefined;
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<messageType[] | null>([
    { username: "user1", message: "hello" },
    { username: "user2", message: "hii there" },
  ]);
  const socketRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    console.log("mounted");
    const socket = new WebSocket("ws://localhost:8000");
    if (socket) {
      socketRef.current = socket;
    }
    socket.onopen = () => {
      console.log("socket connected");
    };
    socket.onmessage = (e) => {
      console.log("message received from the server that says: ", e.data);
      setMessages([
        ...messages,
        {
          username: adminUser,
          message: e.data,
        },
      ]);
    };

    socket.onclose = () => {
      console.log("oh no!!socket is closed, see you again");
    };

    return () => {
      console.log("unmounted");
    };
  }, [socketRef]);

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      {messages.map((each, idx) => (
        <div
          key={idx}
          className={`w-full flex flex-row text-base font-semibold items-center ${each.username === adminUser ? "text-red-500 justify-end" : "text-green-500 justify-start"}`}
        >
          <div
            className={`flex flex-row items-center px-4 py-2 border border-neutral-700 rounded-md`}
          >
            {each.message}
          </div>
        </div>
      ))}
      <div className="flex flex-row items-center justify-center">
        <textarea
          name=""
          id=""
          rows={1}
          className="border border-neutral-300 p-2 resize-none"
          placeholder="enter the message here"
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></textarea>
        <button
          className="py-2 px-4 border border-neutral-300"
          onClick={() => {
            setMessages([
              ...messages,
              { username: adminUser, message: currentMessage },
            ]);
            socketRef.current?.send(currentMessage);
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};
