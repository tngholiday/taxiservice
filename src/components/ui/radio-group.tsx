import * as React from "react";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export function RadioGroup({ value, onValueChange, children, ...props }: RadioGroupProps) {
  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (
          React.isValidElement(child) &&
          child.type === RadioGroupItem
        ) {
          const childProps = child.props as RadioGroupItemProps;
          return React.cloneElement(child, {
            checked: childProps.value === value,
            onChange: () => onValueChange(childProps.value as string),
            name: props.id || "radio-group"
          } as RadioGroupItemProps);
        }
        return child;
      })}
    </div>
  );
}

export type RadioGroupItemProps = React.InputHTMLAttributes<HTMLInputElement>;

export function RadioGroupItem({ className = "", ...props }: RadioGroupItemProps) {
  return (
    <input type="radio" className={"h-4 w-4 text-red-600 focus:ring-red-500 " + className} {...props} />
  );
} 