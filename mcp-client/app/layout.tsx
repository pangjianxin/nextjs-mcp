import QueryClientProvider from "@/lib/QueryClientProvider";
import { cn } from "@/lib/utils";
import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "企贷智慧助手",
  description: "Enterprise Credit Assistant",
  icons: ["/favicon.ico"],
};

/**
 * RootLayout component that sets up the basic HTML structure for the application.
 * It includes meta tags, favicon, and optionally includes analytics scripts if the environment variables are set.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing children elements to be rendered within the layout.
 * @returns {JSX.Element} The root layout component.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <SessionProvider session={session}>
          <QueryClientProvider>
            <ThemeProvider attribute={"class"}>{children}</ThemeProvider>
          </QueryClientProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
