'use client';

import { useEffect } from 'react';
import { speakers } from "@/lib/data";
import QuoteWall from "@/components/QuoteWall";
import SpeakerCard from "@/components/SpeakerCard";
import Link from "next/link";
import { Sparkles, Cpu, Zap, Brain, Terminal, Code, Star, Settings } from "lucide-react";

export default function Home() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);
  }, []);

  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Hero */}
      <section className="px-6 pt-8 pb-16 text-center relative z-10">
        {/* Admin Link */}
        <div className="flex justify-end mb-6">
          <Link href="/admin" className="glass rounded-full px-5 py-2.5 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 flex items-center gap-2 text-slate-400 hover:text-purple-400">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-bold">管理后台</span>
          </Link>
        </div>
        
        <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2 mb-6 border border-blue-500/40 shadow-lg hover:shadow-blue-500/20 transition-all duration-500 border-gradient-blue">
          <div className="relative">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-md" />
          </div>
          <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
            AI × 内容拆解 · 知识结构化引擎
          </span>
        </div>
        
        <div className="float mb-6">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-1 tracking-tighter neon-blue">
              生财有术
            </h1>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 tracking-tight">
            AI 大会
          </h2>
        </div>
        
        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          按{" "}
          <span className="text-blue-400 font-bold relative inline-block group">
            道
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:h-1.5 transition-all"></span>
          </span>
          ·
          <span className="text-purple-400 font-bold relative inline-block group">
            法
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:h-1.5 transition-all"></span>
          </span>
          ·
          <span className="text-green-400 font-bold relative inline-block group">
            术
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:h-1.5 transition-all"></span>
          </span>
          ·
          <span className="text-orange-400 font-bold relative inline-block group">
            器
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full group-hover:h-1.5 transition-all"></span>
          </span>{" "}
          四层结构整理嘉宾演讲精华
        </p>

        {/* Tech Stats */}
        <div className="flex flex-wrap justify-center gap-5">
          <div className="glass rounded-3xl px-7 py-5 border border-slate-700/50 hover-lift group border-gradient-blue relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/40 group-hover:glow-blue transition-all duration-500">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white mb-1">{speakers.length}</p>
                <p className="text-slate-400 text-sm font-medium">位嘉宾</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-3xl px-7 py-5 border border-slate-700/50 hover-lift group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/40 group-hover:glow-purple transition-all duration-500">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white mb-1">{speakers.reduce((acc, s) => acc + s.dao.length, 0)}</p>
                <p className="text-slate-400 text-sm font-medium">条金句</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-3xl px-7 py-5 border border-slate-700/50 hover-lift group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center border border-green-500/40 group-hover:glow-green transition-all duration-500">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white mb-1">
                  {speakers.reduce((acc, s) => acc + s.fa.length + s.shu.length, 0)}
                </p>
                <p className="text-slate-400 text-sm font-medium">方法/技巧</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-3xl px-7 py-5 border border-slate-700/50 hover-lift group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center border border-orange-500/40 group-hover:glow-orange transition-all duration-500">
                <Terminal className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-left">
                <p className="text-3xl font-black text-white mb-1">
                  {speakers.reduce((acc, s) => acc + s.qi.length, 0)}
                </p>
                <p className="text-slate-400 text-sm font-medium">工具推荐</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Wall */}
      <section className="py-10 relative z-10">
        <div className="px-6 mb-7 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            <div className="flex items-center gap-3 glass rounded-full px-6 py-2 border border-blue-500/30">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h2 className="text-slate-200 text-sm font-bold uppercase tracking-[0.3em]">
                道 · 金句墙
              </h2>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
          </div>
        </div>
        <QuoteWall speakers={speakers} />
      </section>

      {/* Speaker Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <Code className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">嘉宾阵容</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">探索每位嘉宾的智慧结晶</h2>
          <p className="text-slate-400 text-lg">点击卡片查看完整内容</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass inline-flex items-center gap-3 rounded-full px-6 py-3 border border-slate-700/50 mb-5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-slate-400 text-sm">System Online · All Systems Nominal</span>
          </div>
          <p className="text-slate-500 text-sm">
            Built with ❤️ using Next.js · Tailwind CSS · Shadcn UI
          </p>
        </div>
      </footer>
    </main>
  );
}
