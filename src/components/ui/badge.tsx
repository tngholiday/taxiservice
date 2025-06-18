import * as React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className = "", ...props }: BadgeProps) {
  return (
    <span className={"inline-block px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800 " + className} {...props} />
  );
} 