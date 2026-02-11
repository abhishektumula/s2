import { cn } from "@/lib/utils";
import React from "react";
export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full max-w-2xl bg-black text-white", className)}>
      {children}
    </div>
  );
};
