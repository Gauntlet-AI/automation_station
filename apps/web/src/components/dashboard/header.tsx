import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

const headingVariants = cva(
  "font-bold tracking-tight text-3xl md:text-4xl",
  {
    variants: {
      size: {
        default: "text-3xl md:text-4xl",
        sm: "text-2xl md:text-3xl",
        lg: "text-4xl md:text-5xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export function DashboardHeader({
  heading,
  text,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 pb-8", className)}>
      <h1 className={cn(headingVariants())}>{heading}</h1>
      {text && <p className="text-muted-foreground text-lg">{text}</p>}
      {children}
    </div>
  );
} 