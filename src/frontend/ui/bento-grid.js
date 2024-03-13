import { cn } from "../../utils/cn.ts"; // Adjust path if necessary
import React from "react";

export const BentoGrid = ({ children, ...props }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ children, ...props }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        props.className
      )}
    >
      {children}
    </div>
  );
};
