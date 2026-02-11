"use clinet";
import { cn } from "@/lib/utils";

export const CustomButton = ({
  func,
  desc,
  className,
}: {
  func: string;
  desc?: () => unknown;
  className?: string;
}) => {
  return (
    <div className={cn("w-full", className)}>
      <button
        onClick={desc}
        className="px-6 py-2 border border-neutral-800 rounded-md"
      >
        {func}
      </button>
    </div>
  );
};
