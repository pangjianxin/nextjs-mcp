"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Award, Globe, BarChart3 } from "lucide-react";
import Login from "@/components/sections/login";

export const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Simple parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-300 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-300 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-300 blur-3xl"></div>
      </div>

      {/* Periodic table element decorations */}
      <div className="absolute top-10 left-10 w-16 h-16 rounded border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center opacity-30 dark:opacity-20">
        <span className="text-xs text-emerald-600 dark:text-emerald-400">
          39
        </span>
        <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          Y
        </span>
        <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
          钇
        </span>
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16 rounded border border-blue-200 dark:border-blue-800 flex flex-col items-center justify-center opacity-30 dark:opacity-20">
        <span className="text-xs text-blue-600 dark:text-blue-400">64</span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Gd
        </span>
        <span className="text-[10px] text-blue-600 dark:text-blue-400">钆</span>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 md:py-24">
          {/* Left content area */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                中国稀土行业领先门户
              </div>

              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
                  中国稀土网
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                创建于1998年，作为全国稀土信息网的重要组成部分，我们致力于提供稀土行业资讯、产品价格和专业知识的综合电子信息平台。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-3">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    我们的使命
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-emerald-500 mr-1 mt-0.5 shrink-0" />
                    <span>构建行业信息枢纽</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-emerald-500 mr-1 mt-0.5 shrink-0" />
                    <span>提供全方位的信息增值服务</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-emerald-500 mr-1 mt-0.5 shrink-0" />
                    <span>把握正确的舆论导向</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    我们的成就
                  </h3>
                </div>
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center">
                    <BarChart3 className="w-4 h-4 text-blue-500 mr-2 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        300万+
                      </span>{" "}
                      总访问量
                    </div>
                  </div>
                  <p>
                    在国内外稀土行业享有较高的知名度和声誉，已成为全国稀土界的主流媒体和龙头网站。
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href={`/`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                进入管理端
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>

              <Login />
            </motion.div>
          </div>

          {/* Right image area */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main image with decorative elements */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                <Image
                  src="/images/hero.jpg"
                  alt="稀土矿产展示"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white text-sm font-medium bg-slate-900/40 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    追求"国际知名、国内一流"的目标
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                ref={parallaxRef}
                className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-700"
              ></div>
              <div className="absolute -z-10 -top-6 -left-6 w-full h-full rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700"></div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 z-20 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      创建于
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      1998年12月
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
