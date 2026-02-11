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
  const [messages, setMessages] = useState<messageType[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("socket connected");
    };

    socket.onmessage = (e) => {
      console.log("message received from the server that says: ", e.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: "Remote User", // Assign a different username for received messages to enable distinct styling
          message: e.data,
        },
      ]);
    };

    socket.onclose = () => {
      console.log("oh no!!socket is closed, see you again");
    };

    return () => {
      console.log("unmounted");
      socket.close();
    };
  }, [adminUser]);

  const handleSendMessage = () => {
    if (currentMessage.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: adminUser, message: currentMessage },
      ]);
      socketRef.current?.send(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start gap-4 w-full">
      {messages.map((each, idx) => (
        <div
          key={idx}
          className={`w-full flex flex-row text-base font-semibold items-center ${
            each.username === adminUser
              ? "text-red-500 justify-end"
              : "text-green-500 justify-start"
          }`}
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
          value={currentMessage}
          className="border border-neutral-300 p-2 resize-none"
          placeholder="enter the message here"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        ></textarea>
        <button
          className="py-2 px-4 border border-neutral-300"
          onClick={handleSendMessage}
        >
          send
        </button>
      </div>
    </div>
  );
};
