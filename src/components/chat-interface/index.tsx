"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ConnectionState } from "@/components/chat-page";

export type messageType = {
  username: string | null | undefined;
  message: string;
};

type MatchKind = "boy-1" | "boy-2" | "love";

type MatchRange = {
  start: number;
  end: number;
  kind: MatchKind;
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getMatchRanges = (message: string, loverName: string): MatchRange[] => {
  const ranges: MatchRange[] = [];

  const boyRegex = /\babhishek\b/gi;
  let match: RegExpExecArray | null;
  let boyCount = 0;

  while ((match = boyRegex.exec(message)) !== null) {
    boyCount += 1;
    ranges.push({
      start: match.index,
      end: match.index + match[0].length,
      kind: boyCount % 2 === 1 ? "boy-1" : "boy-2",
    });
  }

  const cleanLoverName = loverName.trim();
  if (cleanLoverName) {
    const loverRegex = new RegExp(escapeRegExp(cleanLoverName), "gi");
    while ((match = loverRegex.exec(message)) !== null) {
      ranges.push({
        start: match.index,
        end: match.index + match[0].length,
        kind: "love",
      });
    }
  }

  ranges.sort((a, b) => a.start - b.start);

  const deduped: MatchRange[] = [];
  for (const range of ranges) {
    const hasOverlap = deduped.some(
      (saved) => !(range.end <= saved.start || range.start >= saved.end),
    );

    if (!hasOverlap) {
      deduped.push(range);
    }
  }

  return deduped;
};

const renderAnimatedMessage = (
  message: string,
  loverName: string,
): ReactNode[] => {
  const ranges = getMatchRanges(message, loverName);

  if (!ranges.length) {
    return [message];
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start > cursor) {
      nodes.push(message.slice(cursor, range.start));
    }

    const text = message.slice(range.start, range.end);
    const className =
      range.kind === "love"
        ? "chat-word-love"
        : range.kind === "boy-1"
          ? "chat-word-boy-one"
          : "chat-word-boy-two";

    nodes.push(
      <span key={`${text}-${range.start}-${index}`} className={className}>
        {text}
      </span>,
    );

    cursor = range.end;
  });

  if (cursor < message.length) {
    nodes.push(message.slice(cursor));
  }

  return nodes;
};

export const ChatInterface = ({
  adminUser,
  loverName,
  onConnectionStateChange,
}: {
  adminUser: string | null | undefined;
  loverName: string;
  onConnectionStateChange: (state: ConnectionState) => void;
}) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onConnectionStateChange("connecting");

    const socket = new WebSocket("ws://localhost:8000");
    socketRef.current = socket;

    socket.onopen = () => {
      onConnectionStateChange("connected");
    };

    socket.onmessage = (e) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: "Remote User",
          message: e.data,
        },
      ]);
    };

    socket.onerror = () => {
      onConnectionStateChange("disconnected");
    };

    socket.onclose = () => {
      onConnectionStateChange("disconnected");
    };

    return () => {
      socket.close();
    };
  }, [adminUser, onConnectionStateChange]);

  const handleSendMessage = () => {
    if (
      currentMessage.trim() &&
      socketRef.current?.readyState === WebSocket.OPEN
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { username: adminUser, message: currentMessage },
      ]);
      socketRef.current?.send(currentMessage);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="chat-shell flex min-h-[70vh] flex-col rounded-md p-3 sm:p-4 md:min-h-[76vh] md:p-6 lg:p-7">
      <div className="mb-3 flex items-center justify-between sm:mb-4 md:mb-5">
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--chat-muted)]">
          chat room
        </h2>
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto rounded-md border border-[var(--chat-border)] bg-[var(--chat-surface)]/75 p-3 sm:space-y-3 sm:p-4 md:space-y-3.5 md:p-5 lg:p-6">
        {messages.length === 0 && (
          <p className="text-sm leading-6 text-[var(--chat-muted)]">
            Start the conversation.
          </p>
        )}

        {messages.map((each, idx) => {
          const fromAdmin = each.username === adminUser;

          return (
            <div
              key={idx}
              className={`flex w-full ${fromAdmin ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-md px-3 py-2.5 text-[14px] leading-6 shadow-sm sm:max-w-[84%] sm:px-4 sm:text-[15px] sm:leading-7 md:max-w-[82%] md:px-5 md:py-3 ${
                  fromAdmin
                    ? "bg-[var(--chat-accent)] text-[var(--chat-accent-text)]"
                    : "border border-[var(--chat-border)] bg-[var(--chat-message-other)] text-[var(--chat-text)]"
                }`}
              >
                <p>{renderAnimatedMessage(each.message, loverName)}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 rounded-md border border-[var(--chat-border)] bg-[var(--chat-surface)] p-2 sm:mt-4 sm:p-2.5 md:mt-5 md:p-3">
        <div className="flex items-stretch gap-2">
          <textarea
            rows={1}
            value={currentMessage}
            className="h-11 w-full resize-none rounded-sm border border-[var(--chat-border)] bg-transparent px-3 py-2.5 text-[14px] leading-5 text-[var(--chat-text)] outline-none placeholder:text-[var(--chat-muted)] sm:h-12 sm:py-3 sm:text-[15px]"
            placeholder="Enter the message here"
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            className="h-11 shrink-0 rounded-sm border border-[var(--chat-border)] bg-[var(--chat-accent)] px-5 text-[14px] font-semibold text-[var(--chat-accent-text)] transition hover:brightness-95 sm:h-12 sm:px-6 sm:text-[15px]"
            onClick={handleSendMessage}
          >
            send
          </button>
        </div>
      </div>
    </section>
  );
};
