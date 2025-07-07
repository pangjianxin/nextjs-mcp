"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogIn } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn } from "next-auth/react";

// Client-side validation schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(6, { message: "密码长度不能小于6位" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(
    searchParams.get("error") ? "登录失败，请检查用户名和密码" : null
  );

  // Initialize react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle credentials login
  const onSubmit = async (data: LoginFormValues) => {
    setError(null);

    try {
      const result = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("登录失败，请检查用户名和密码");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("登录过程中发生错误，请稍后再试");
    }
  };

  // Handle OIDC login
  const handleOidcSignin = async () => {
    try {
      await signIn("openiddict", { callbackUrl: "/" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="fixed inset-0 z-0">
        <Image
          src={`/images/bg.jpg`}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20 dark:border-white/10">
        {/* Logo and Header */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative w-[220px] h-[80px]">
            <Image
              src="/images/logo.svg"
              alt="Kanegi Logo"
              width={220}
              height={80}
              className="object-contain dark:invert"
            />
          </div>
          <h1 className="text-2xl font-medium text-white">企业智能顾问</h1>
          <p className="text-white/80 text-sm">用户登录</p>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="bg-red-500/20 border-red-500/50 text-white"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-white">
                      登录用户名
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="bg-white/20 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                        placeholder="请输入用户名"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-white">
                      用户密码
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="bg-white/20 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:ring-white/20"
                        placeholder="请输入密码"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  处理中...
                </span>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  登录
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="relative flex items-center justify-center">
          <Separator className="absolute w-full bg-white/20" />
          <span className="relative bg-white/10 px-2 text-xs text-white/70">
            或者
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {/* <Link
            href="/account/register"
            className="w-full text-sm flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-md transition-colors"
          >
            <span>账户注册</span>
          </Link> */}

          <Button
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
            onClick={handleOidcSignin}
            variant="outline"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            统一认证
          </Button>
        </div>
      </div>
    </div>
  );
}
