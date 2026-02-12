"use client";
import { signOut } from "next-auth/react";
import { IconLogout2 } from "@tabler/icons-react";

export const NavBar = ({
  adminUser,
}: {
  adminUser: string | null | undefined;
}) => {
  return (
    <div className="w-full h-15 flex flex-row items-center justify-between">
      <div className="ml-6 font-semibold py-2 border border-neutral-300 px-4 rounded-md hover:shadow-md/50 transition duration-300">
        {adminUser ? <h1>{adminUser}</h1> : <h2>adminUser</h2>}
      </div>
      <div>
        <button
          className="px-4 py-2 border border-neutral-200"
          onClick={() => {
            signOut();
          }}
        >
          <IconLogout2 size={20} color="red" className="" />
        </button>
      </div>
    </div>
  );
};
