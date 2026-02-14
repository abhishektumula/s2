"use client";

import { signOut } from "next-auth/react";
import { IconLogout2, IconPalette } from "@tabler/icons-react";
import type { ChatTheme, ConnectionState } from "@/components/chat-page";

const themeOptions: Array<{ label: string; value: ChatTheme }> = [
  { label: "polimaders", value: "polimaders" },
  { label: "fay", value: "fay" },
  { label: "claude color scheme", value: "claude" },
  { label: "dark cursor", value: "dark-cursor" },
  { label: "dark emerald", value: "dark-emerald" },
  { label: "dark violet", value: "dark-violet" },
];

const statusColor: Record<ConnectionState, string> = {
  connected: "#1f9d5a",
  connecting: "#d99a29",
  disconnected: "#d05252",
};

export const NavBar = ({
  adminUser,
  connectionState,
  theme,
  onThemeChange,
}: {
  adminUser: string | null | undefined;
  connectionState: ConnectionState;
  theme: ChatTheme;
  onThemeChange: (value: ChatTheme) => void;
}) => {
  return (
    <header className="chat-shell rounded-md px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <div className="chat-ui-surface chat-ui-border flex h-9 min-w-0 items-center rounded-sm border px-2.5 sm:h-10 sm:px-3">
            <h1 className="chat-ui-text max-w-24 truncate text-[14px] font-semibold leading-5 sm:max-w-32 sm:text-[15px] md:max-w-60">
              {adminUser || "admin"}
            </h1>
          </div>

          <div className="chat-ui-surface chat-ui-border chat-ui-muted flex h-9 shrink-0 items-center gap-1.5 rounded-sm border px-2 text-[11px] font-medium capitalize tracking-[0.01em] sm:h-10 sm:gap-2 sm:px-2.5 sm:text-[12px] md:px-3 md:text-[13px]">
            <span
              className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
              style={{ backgroundColor: statusColor[connectionState] }}
            />
            {connectionState}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="relative md:hidden">
            <div className="chat-ui-surface chat-ui-border chat-ui-text flex h-9 w-9 items-center justify-center rounded-sm border sm:h-10 sm:w-10">
              <IconPalette size={17} />
            </div>
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value as ChatTheme)}
              className="absolute inset-0 h-9 w-9 cursor-pointer opacity-0 sm:h-10 sm:w-10"
              aria-label="Select theme"
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <select
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as ChatTheme)}
            className="chat-ui-surface chat-ui-border chat-ui-text hidden h-10 min-w-47.5 rounded-sm border px-3 text-[13px] font-medium outline-none transition focus:border-(--chat-accent) md:block"
            aria-label="Select theme"
          >
            {themeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            className="chat-ui-surface chat-ui-border flex h-9 w-9 items-center justify-center rounded-sm border transition hover:opacity-90 sm:h-10 sm:w-10"
            onClick={() => {
              signOut();
            }}
            aria-label="Logout"
          >
            <IconLogout2
              size={20}
              color="currentColor"
              className="text-red-500"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
