"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Shield, Sparkles, ArrowRight, Play, Brain } from "lucide-react"
import { useState, useEffect } from "react"

export default function AILandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* 动态背景效果 */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* 主要内容区域 */}
      <main className="relative z-10">
        {/* 英雄区域 */}
        <section className="px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              {/* 标签 */}
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                下一代人工智能平台
              </Badge>

              {/* 主标题 */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  重新定义
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  人工智能的未来
                </span>
              </h1>

              {/* 副标题 */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                通过我们革命性的AI技术，释放无限可能。从智能自动化到深度学习， 让人工智能成为您业务增长的强大引擎。
              </p>

              {/* 按钮组 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  开始体验
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Play className="mr-2 w-5 h-5" />
                  观看演示
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 特性展示 */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  为什么选择我们
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                我们的AI平台集成了最先进的技术，为您提供无与伦比的智能体验
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">智能学习</h3>
                  <p className="text-gray-400 leading-relaxed">
                    基于深度学习算法，持续优化和改进，为您提供越来越精准的智能服务
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">极速处理</h3>
                  <p className="text-gray-400 leading-relaxed">
                    毫秒级响应时间，强大的并行处理能力，让您的业务流程更加高效
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">安全可靠</h3>
                  <p className="text-gray-400 leading-relaxed">
                    企业级安全保障，数据加密传输，确保您的信息安全和隐私保护
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="px-6 lg:px-8 py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  1M+
                </div>
                <div className="text-gray-400">活跃用户</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">系统稳定性</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-gray-400">AI模型</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-gray-400">技术支持</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
