import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const Select = ({ children, value, onValueChange, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find the selected item's label
  let selectedLabel = null;
  
  // Process all children to find the selected item
  React.Children.forEach(children, child => {
    if (React.isValidElement(child) && child.type === SelectContent) {
      // Check direct SelectItem children
      React.Children.forEach(child.props.children, contentChild => {
        if (React.isValidElement(contentChild)) {
          if (contentChild.type === SelectItem && contentChild.props.value === value) {
            selectedLabel = contentChild.props.children;
          } else if (contentChild.type === SelectGroup) {
            // Check SelectItems inside SelectGroups
            React.Children.forEach(contentChild.props.children, groupChild => {
              if (React.isValidElement(groupChild) && 
                  groupChild.type === SelectItem && 
                  groupChild.props.value === value) {
                selectedLabel = groupChild.props.children;
              }
            });
          }
        }
      });
    }
  });
  
  // No need for context as we're passing values directly


  return (
    <div ref={ref} className="relative w-full">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === SelectTrigger) {
            // Clone the trigger with our props
            return React.cloneElement(child, {
              onClick: () => !disabled && setOpen(!open),
              open,
              disabled,
              value: selectedLabel,
            }, 
            // Map the children of the trigger
            React.Children.map(child.props.children, triggerChild => {
              // If it's a SelectValue, replace its placeholder with the selected value
              if (React.isValidElement(triggerChild) && triggerChild.type === SelectValue) {
                return React.cloneElement(triggerChild, {
                  placeholder: selectedLabel || triggerChild.props.placeholder
                });
              }
              return triggerChild;
            }));
          }
          if (child.type === SelectContent) {
            return open ? React.cloneElement(child, {
              onSelect: (val) => {
                onValueChange?.(val);
                setOpen(false);
              },
            }) : null;
          }
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ className, children, open, disabled, onClick, value }) => (
  <button
    type="button"
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      open && "ring-2 ring-ring ring-offset-2",
      className
    )}
    disabled={disabled}
    onClick={onClick}
  >
    <span className="truncate">{value || children}</span>
    <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform ml-2 flex-shrink-0", open && "rotate-180")} />
  </button>
);

const SelectValue = ({ placeholder, className }) => {
  return <span className={cn("text-muted-foreground", className)}>{placeholder}</span>;
};

const SelectContent = ({ className, children, onSelect }) => {
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === SelectItem) {
            return React.cloneElement(child, {
              onSelect
            });
          } else if (child.type === SelectGroup) {
            // Handle SelectGroup by recursively processing its children
            return React.cloneElement(child, {
              children: React.Children.map(child.props.children, groupChild => {
                if (React.isValidElement(groupChild) && groupChild.type === SelectItem) {
                  return React.cloneElement(groupChild, {
                    onSelect
                  });
                }
                return groupChild;
              })
            });
          }
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({ className, children, value, onSelect, disabled }) => {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => !disabled && onSelect?.(value)}
      data-disabled={disabled || undefined}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Check className="h-4 w-4 opacity-0" />
      </span>
      {children}
    </div>
  );
};

const SelectGroup = ({ className, children }) => {
  return <div className={cn("p-1", className)}>{children}</div>;
};

const SelectLabel = ({ className, children }) => {
  return <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>{children}</div>;
};

const SelectSeparator = ({ className }) => {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
};

// Export Select as default and named export
export default Select;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};