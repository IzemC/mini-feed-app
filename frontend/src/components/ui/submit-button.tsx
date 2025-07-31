import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

export const SubmitButton = ({
  children,
  isLoading,
  disabled,
  className,
  ...props
}: {
  children: React.ReactNode;
  isLoading: boolean;
  disabled: boolean;
  className?: string;
}) => {
  return (
    <button
      {...props}
      type="submit"
      disabled={isLoading || disabled}
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {children}
        </>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
