"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">页面未找到</h2>
        <p className="text-lg text-muted-foreground">
          抱歉，您要查找的页面不存在或已被移动。
        </p>
        <div className="pt-6">
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <Image
          src="/images/logo.svg"
          alt="404 Illustration"
          className="w-48 h-48 object-contain"
          width={192}
          height={192}
        />
      </div>
    </div>
  );
}
