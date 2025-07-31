import { getAvatarProps } from "@/utils/avatar-props";
import { cn } from "@/utils/cn";

export function Avatar({
  userId,
  userName,
  className = "",
}: {
  userId: string;
  userName: string;
  className?: string;
}) {
  const avatarProps = getAvatarProps(userName, userId);
  return (
    <div
      className={cn(
        "size-10 rounded-full flex items-center justify-center font-medium",
        className,
        avatarProps.bgColor
      )}
    >
      {avatarProps.initials}
    </div>
  );
}
