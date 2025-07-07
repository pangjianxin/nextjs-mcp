"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Shield,
  Search,
  ArrowRight,
  LogIn,
  LogOut,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function BankingAIHomepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const session = useSession();
  const handleSignin = () => {
    router.push(`/account/login`);
  };
  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* 动态背景效果 */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* 主要内容区域 */}
      <div className="relative z-10">
        {/* 英雄区域 */}
        <section className="px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 左侧内容 */}
              <div className="space-y-8">
                {/* 标签 */}
                <Badge
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  银行智能决策平台
                </Badge>

                {/* 主标题 */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    企业贷款
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    智能决策助手
                  </span>
                </h1>

                {/* 副标题 */}
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                  为银行客户经理打造的全流程智能体集合，涵盖贷前调查、贷中监控、贷后管理，
                  一站式查询企业各类信息，提升决策效率与风控水平。
                </p>

                {/* 按钮组 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  {session.status === "authenticated" ? (
                    <>
                      <Button
                        size="lg"
                        onClick={() => router.push("/agent")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                      >
                        立即开始
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        size="lg"
                        onClick={handleSignOut}
                        variant={"destructive"}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                      >
                        <LogOut className="ml-2 w-5 h-5" />
                        注销登录
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleSignin}
                      variant={"default"}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                    >
                      <LogIn className="ml-2 w-5 h-5" />
                      账户登录
                    </Button>
                  )}
                </div>
              </div>

              {/* 右侧图片 */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero.jpg"
                    alt="银行智能决策平台"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 核心功能展示 */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  全流程智能服务
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                贷前、贷中、贷后全覆盖，AI驱动的企业信息查询与风险评估
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    贷前调查
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    智能收集企业工商信息、财务数据、征信记录，快速生成客户画像和风险评估报告
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    贷中监控
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    实时监控企业经营状况、资金流向、行业动态，及时预警潜在风险
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    贷后管理
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    持续跟踪还款能力、资产变化、合规情况，智能制定催收策略和风险处置方案
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 平台优势 */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  平台核心优势
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    多源数据整合
                  </h4>
                  <p className="text-gray-400 text-sm">
                    整合工商、税务、司法、征信等多维度数据源
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    智能风险评估
                  </h4>
                  <p className="text-gray-400 text-sm">
                    AI算法精准评估企业信用风险和还款能力
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    协同办公
                  </h4>
                  <p className="text-gray-400 text-sm">
                    支持团队协作，信息共享，提升工作效率
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    合规安全
                  </h4>
                  <p className="text-gray-400 text-sm">
                    符合银行业监管要求，确保数据安全合规
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
