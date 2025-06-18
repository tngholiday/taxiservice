import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", onCheckedChange, ...props }, ref) => (
    <input
      type="checkbox"
      className={
        "h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500 " +
        className
      }
      ref={ref}
      onChange={e => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox"; 