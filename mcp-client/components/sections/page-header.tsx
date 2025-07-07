"use client";
import React from "react";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden mb-2">
      <div className="container mx-auto">
        <div className="relative z-10 flex items-center justify-between min-h-[50px] md:min-h-[60px]">
          <div className="flex flex-row items-center text-primary gap-2 mb-2 md:mb-0">
            <span className="line-clamp-1 text-2xl font-bold text-primary bg-clip-text tracking-[3px]">
              {title}
            </span>
          </div>
          {children && (
            <div className="text-sm md:text-base text-muted-foreground max-w-xl md:text-right">
              {children}
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-primary via-secondary to-primary opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-border"></div>
          <div className="absolute bottom-1/2 left-0 w-24 h-24 bg-primary/10 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/2 right-0 w-24 h-24 bg-secondary/10 rounded-full filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </header>
  );
}
