import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Shell({ 
  children, 
  className, 
  ...props 
}: ShellProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 pb-20 pt-8 md:py-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 