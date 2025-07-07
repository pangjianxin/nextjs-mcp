import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Loader2 className="mr-2 h-16 w-16 animate-spin" />
      <span className="text-2xl">加载中...</span>
    </div>
  );
}
