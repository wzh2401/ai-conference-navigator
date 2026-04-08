import { speakers } from "@/lib/data";
import QuoteWall from "@/components/QuoteWall";
import SpeakerCard from "@/components/SpeakerCard";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero */}
      <section className="px-6 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-400 text-xs font-medium">AI × 内容拆解</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          生财有术 AI 大会
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          按{" "}
          <span className="text-blue-400 font-medium">道</span>·
          <span className="text-purple-400 font-medium">法</span>·
          <span className="text-green-400 font-medium">术</span>·
          <span className="text-orange-400 font-medium">器</span>{" "}
          四层结构整理嘉宾演讲精华
        </p>
        <div className="flex justify-center gap-6 mt-8 text-sm text-slate-500">
          <span>{speakers.length} 位嘉宾</span>
          <span>·</span>
          <span>{speakers.reduce((acc, s) => acc + s.dao.length, 0)} 条金句</span>
          <span>·</span>
          <span>
            {speakers.reduce((acc, s) => acc + s.fa.length + s.shu.length, 0)} 个方法/技巧
          </span>
        </div>
      </section>

      {/* Quote Wall */}
      <section className="py-4">
        <div className="px-6 mb-4">
          <h2 className="text-slate-400 text-sm font-medium uppercase tracking-wider">
            — 道 · 金句墙
          </h2>
        </div>
        <QuoteWall speakers={speakers} />
      </section>

      {/* Speaker Grid */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-white text-xl font-semibold mb-6">嘉宾列表</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </section>
    </main>
  );
}
