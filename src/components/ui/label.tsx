import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", ...props }, ref) => (
    <label
      className={
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 " +
        className
      }
      ref={ref}
      {...props}
    />
  )
);
Label.displayName = "Label"; 