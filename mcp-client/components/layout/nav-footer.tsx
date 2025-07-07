"use client"

import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Genesis
            </span>
          </div>

          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-white transition-colors">
              服务条款
            </a>
            <a href="#" className="hover:text-white transition-colors">
              联系我们
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 AI Genesis. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
