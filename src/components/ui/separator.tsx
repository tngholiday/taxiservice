import * as React from "react";

export function Separator({ className = "", ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr className={"border-t border-gray-200 my-2 " + className} {...props} />
  );
} 