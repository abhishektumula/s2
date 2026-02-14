"use client";

import { useState } from "react";
import { NavBar } from "@/components/bars";
import { ChatInterface } from "@/components/chat-interface";
import { Container } from "@/components/container";

export type ChatTheme =
  | "polimaders"
  | "fay"
  | "claude"
  | "dark-cursor"
  | "dark-emerald"
  | "dark-violet";

export type ConnectionState = "connecting" | "connected" | "disconnected";

export const ChatPageClient = ({
  adminUser,
  loverName,
}: {
  adminUser: string | null | undefined;
  loverName: string;
}) => {
  const [theme, setTheme] = useState<ChatTheme>("polimaders");
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("connecting");

  return (
    <div className={`chat-page-root chat-theme-${theme} min-h-screen`}>
      <Container className="mx-auto min-h-screen px-3 py-4 sm:px-4 sm:py-6 md:px-8 md:py-9">
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col gap-4 sm:gap-5 lg:gap-7">
          <NavBar
            adminUser={adminUser}
            connectionState={connectionState}
            theme={theme}
            onThemeChange={setTheme}
          />

          <main className="flex-1">
            <ChatInterface
              adminUser={adminUser}
              loverName={loverName}
              onConnectionStateChange={setConnectionState}
            />
          </main>
        </div>
      </Container>
    </div>
  );
};
