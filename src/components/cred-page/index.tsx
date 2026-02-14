"use client";
import { signIn } from "next-auth/react";
import { CustomButton } from "./button";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export const CheckIn = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secretkey, setSecretkey] = useState<string>("");

  const handleClick = async () => {
    const res = await signIn("credentials", {
      username: userName,
      password: password,
      securekey: secretkey,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/chat");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="min-h-screen max-w-md w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 w-full border border-neutral-200 p-6 rounded-md">
        <div className="w-full">
          <input
            type="text"
            className="w-full px-2 py-2 border border-neutral-600 rounded-md"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full px-2 py-2 border border-neutral-600 rounded-md"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            className="w-full px-2 py-2 border border-neutral-600 rounded-md"
            placeholder="security key"
            onChange={(e) => setSecretkey(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-xs text-center text-red-600">
            Don't have an account? You cannot create one.Feel free to clone the
            repo and make you own chat applicaton.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center p-4">
          <CustomButton
            func="log in"
            desc={handleClick}
            className="hover:bg-neutral-900 text-white transition duration-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
