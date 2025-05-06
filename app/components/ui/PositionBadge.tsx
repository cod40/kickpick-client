import { Position } from "@/constants/positions";

interface PositionBadgeProps {
  position: Position;
  variant?: "default" | "light"; // default는 진한 색, light는 연한 색
  onClick?: () => void;
}

export default function PositionBadge({
  position,
  variant = "default",
  onClick,
}: PositionBadgeProps) {
  const baseClasses =
    "px-3 py-1 rounded-full text-sm transition-all duration-200";
  const colorClasses =
    variant === "default"
      ? `${position.bgColor} ${position.textColor}`
      : position.bgColorLight;
  const clickableClasses = onClick ? "cursor-pointer hover:opacity-80" : "";

  return (
    <span
      onClick={onClick}
      className={`${baseClasses} ${colorClasses} ${clickableClasses}`}
    >
      {position.name}
    </span>
  );
}
