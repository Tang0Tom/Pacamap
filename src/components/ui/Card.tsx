import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-sm border border-gray-100 p-6",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
