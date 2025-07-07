import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface ValueIndicatorProps {
  value: number | undefined | null;
}

export default function ValueIndicator({ value }: ValueIndicatorProps) {
  if (value === undefined || value === null) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <span className="text-sm font-semibold">未获取值</span>
      </div>
    );
  }

  const getColorClass = () => {
    if (value > 0) return "text-red-500";
    if (value < 0) return "text-green-500";
    return "text-gray-500";
  };

  const Icon = () => {
    if (value > 0) return <ArrowUp className="w-5 h-5" />;
    if (value < 0) return <ArrowDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  return (
    <div className={`flex items-center space-x-2 ${getColorClass()}`}>
      <span className="text-sm font-semibold">{value.toFixed(2)}</span>
      <Icon />
    </div>
  );
}
