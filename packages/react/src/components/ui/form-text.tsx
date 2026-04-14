import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

/* === FormField Context === */

type FormFieldSize = "sm" | "md";

const FormFieldContext = React.createContext<FormFieldSize>("md");

function useFormFieldSize() {
  return React.useContext(FormFieldContext);
}

/* === FormField === */

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: FormFieldSize;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({ className, size = "md", ...props }, ref) => (
  <FormFieldContext.Provider value={size}>
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  </FormFieldContext.Provider>
));
FormField.displayName = "FormField";

/* === FormDescription === */

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const size = useFormFieldSize();
    return (
      <p ref={ref} className={cn("text-fg-muted", size === "sm" ? "text-[11px]" : "text-xs", className)} {...props} />
    );
  },
);
FormDescription.displayName = "FormDescription";

/* === FormMessage === */

const formMessageVariants = cva("font-medium", {
  variants: {
    variant: {
      error: "text-destructive-text",
      success: "text-success-text",
      warning: "text-warning-text",
    },
  },
  defaultVariants: {
    variant: "error",
  },
});

interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof formMessageVariants> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, variant, ...props }, ref) => {
    const size = useFormFieldSize();
    return (
      <p
        ref={ref}
        role="alert"
        className={cn(formMessageVariants({ variant }), size === "sm" ? "text-[11px]" : "text-xs", className)}
        {...props}
      />
    );
  },
);
FormMessage.displayName = "FormMessage";

export type { FormFieldProps, FormFieldSize, FormMessageProps };
export { FormDescription, FormField, FormFieldContext, FormMessage, formMessageVariants, useFormFieldSize };
