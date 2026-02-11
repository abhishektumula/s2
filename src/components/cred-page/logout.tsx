"use client";
import { signOut } from "next-auth/react";

export const LogOut = () => {
  return (
    <div className="flex fle-row w-full h-20 items-center justify-end">
      <button
        className="px-4 py-2 rounded-md shadow-md/100"
        onClick={() => {
          signOut();
        }}
      >
        Logout Session
      </button>
    </div>
  );
};
