import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// Create context for radio group state management
const RadioGroupContext = createContext(null);

// Custom RadioGroup component
const RadioGroup = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = useState(value);

  // Update internal state when external value changes
  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  // Handle value change and call external handler
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <RadioGroupContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = "RadioGroup";

// Custom RadioGroupItem component
const RadioGroupItem = React.forwardRef(({ className, value, id, disabled, ...props }, ref) => {
  const radioGroup = useContext(RadioGroupContext);
  const checked = radioGroup?.value === value;

  const handleClick = () => {
    if (!disabled && radioGroup?.onValueChange) {
      radioGroup.onValueChange(value);
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      id={id}
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {checked && (
        <div className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-current" />
        </div>
      )}
    </button>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
