"use client";

import { Speaker } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Play, Pause, Volume2, BookOpen, Lightbulb, Wrench, Settings, Sparkles, Terminal, Clock } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";

interface SpeakerDetailProps {
  speaker: Speaker;
}

function parseTimestamp(ts: string): number {
  const parts = ts.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

export default function SpeakerDetail({ speaker }: SpeakerDetailProps) {
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

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekToTimestamp = useCallback((ts: string) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = parseTimestamp(ts);
    audioRef.current.play();
    setIsPlaying(true);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden pb-40">
      <audio
        ref={audioRef}
        src={speaker.audioSrc}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="glass border-b border-slate-700/40 px-6 py-2 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 font-bold"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-800/60 flex items-center justify-center border border-slate-700/50 hover:border-blue-500/40 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span>返回首页</span>
          </Link>
        </div>
      </div>

      {/* Speaker Info */}
      <div className="max-w-6xl mx-auto px-6 py-4 relative z-10">
        <div className="glass-card rounded-[2.5rem] p-10 border border-slate-700/40">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="relative">
              <div className="w-36 h-36 rounded-[2.5rem] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border-3 border-slate-600">
                {speaker.avatar ? (
                  <img src={speaker.avatar} alt={speaker.name} className="w-full h-full rounded-[2.5rem] object-cover" />
                ) : (
                  <User className="w-16 h-16 text-slate-400" />
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">{speaker.name}</h1>
              <p className="text-slate-400 text-lg mb-7">{speaker.title}</p>
              <div className="flex gap-3 flex-wrap">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/40 hover:border-blue-400/60 transition-all py-2 px-5 rounded-xl text-sm font-bold">
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  道 {speaker.dao.length}
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-400 border-purple-500/40 hover:border-purple-400/60 transition-all py-2 px-5 rounded-xl text-sm font-bold">
                  <Lightbulb className="w-4 h-4 mr-1.5" />
                  法 {speaker.fa.length}
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border-green-500/40 hover:border-green-400/60 transition-all py-2 px-5 rounded-xl text-sm font-bold">
                  <Wrench className="w-4 h-4 mr-1.5" />
                  术 {speaker.shu.length}
                </Badge>
                <Badge className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/40 hover:border-orange-400/60 transition-all py-2 px-5 rounded-xl text-sm font-bold">
                  <Settings className="w-4 h-4 mr-1.5" />
                  器 {speaker.qi.length}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Fixed! */}
      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <Tabs defaultValue="dao" className="w-full">
          <div className="glass-card rounded-3xl p-4 border border-slate-700/40 mb-10">
            <TabsList className="w-full grid grid-cols-4 bg-slate-800/50 rounded-2xl p-1.5 gap-2">
              <TabsTrigger 
                value="dao" 
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/25 data-[state=active]:to-blue-600/25 data-[state=active]:text-blue-400 data-[state=active]:border data-[state=active]:border-blue-500/40 data-[state=active]:shadow-lg data-[state=active]:shadow-blue-500/20 rounded-xl text-sm font-bold transition-all duration-300 px-4 py-2"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                道
              </TabsTrigger>
              <TabsTrigger 
                value="fa" 
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/25 data-[state=active]:to-purple-600/25 data-[state=active]:text-purple-400 data-[state=active]:border data-[state=active]:border-purple-500/40 data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/20 rounded-xl text-sm font-bold transition-all duration-300 px-4 py-2"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                法
              </TabsTrigger>
              <TabsTrigger 
                value="shu" 
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/25 data-[state=active]:to-green-600/25 data-[state=active]:text-green-400 data-[state=active]:border data-[state=active]:border-green-500/40 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/20 rounded-xl text-sm font-bold transition-all duration-300 px-4 py-2"
              >
                <Wrench className="w-4 h-4 mr-2" />
                术
              </TabsTrigger>
              <TabsTrigger 
                value="qi" 
                className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/25 data-[state=active]:to-orange-600/25 data-[state=active]:text-orange-400 data-[state=active]:border data-[state=active]:border-orange-500/40 data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/20 rounded-xl text-sm font-bold transition-all duration-300 px-4 py-2"
              >
                <Settings className="w-4 h-4 mr-2" />
                器
              </TabsTrigger>
            </TabsList>
          </div>

          {/* 道 Tab */}
          <TabsContent value="dao" className="space-y-7 mt-0">
            {speaker.dao.map((item, i) => (
              <div key={i} className="glass-card rounded-[3rem] p-12 border border-blue-500/40 relative overflow-hidden group hover:border-blue-400/80 transition-all duration-500 hover-lift hover:glow-blue hover:glow-gold gilded-border">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-600" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/25 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-gradient-to-tr from-cyan-500/15 to-transparent rounded-full translate-y-1/2" />
                <div className="absolute inset-0 rounded-[3rem] border-gradient-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 pl-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-7 h-7 text-yellow-400" />
                    <span className="text-blue-400 text-sm font-black tracking-wider uppercase">金句 #{i + 1}</span>
                  </div>
                  <p className="text-white text-2xl md:text-3xl font-black leading-relaxed mb-7 group-hover:text-blue-50 transition-colors">
                    「{item.quote}」
                  </p>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8">{item.explanation}</p>
                  <button
                    onClick={() => seekToTimestamp(item.timestamp)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/35 to-cyan-500/35 text-blue-400 hover:from-blue-500/45 hover:to-cyan-500/45 border border-blue-500/50 hover:border-blue-400/70 px-8 py-4 rounded-2xl transition-all duration-300 font-black text-lg hover:glow-blue"
                  >
                    <Play className="w-5 h-5" />
                    <Clock className="w-4 h-4" />
                    {item.timestamp}
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* 法 Tab */}
          <TabsContent value="fa" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {speaker.fa.map((item, i) => (
                <div key={i} className="glass-card rounded-[2.5rem] p-8 border border-purple-500/30 relative overflow-hidden group hover:border-purple-400/60 transition-all duration-500 hover-lift hover:glow-purple">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-400/80 text-xs font-black tracking-wider uppercase">方法论</span>
                    </div>
                    <h3 className="text-white font-black text-2xl mb-2 group-hover:text-purple-50 transition-colors">{item.title}</h3>
                    <p className="text-purple-400 text-base mb-6 font-medium">{item.description}</p>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-6">{item.content}</p>
                    <button
                      onClick={() => seekToTimestamp(item.timestamp)}
                      className="inline-flex items-center gap-2.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-400 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-500/40 hover:border-purple-400/60 px-5 py-2.5 rounded-2xl transition-all duration-300 text-sm font-bold"
                    >
                      <Play className="w-4 h-4" />
                      {item.timestamp}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 术 Tab */}
          <TabsContent value="shu" className="space-y-7 mt-0">
            {speaker.shu.map((item, i) => (
              <div key={i} className="glass-card rounded-[3rem] p-10 border border-green-500/40 relative overflow-hidden group hover:border-green-400/80 transition-all duration-500 hover-lift hover:glow-green hover:glow-gold gilded-border">
                <div className="absolute left-8 top-8 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-green-500/50">
                  <span className="text-white font-black text-2xl">{item.step}</span>
                </div>
                
                <div className="pl-28">
                  <div className="flex items-center gap-3 mb-5">
                    <Wrench className="w-6 h-6 text-green-400" />
                    <span className="text-green-400/90 text-sm font-black tracking-wider uppercase">步骤 {item.step}</span>
                  </div>
                  <h3 className="text-white font-black text-2xl mb-5 group-hover:text-green-50 transition-colors">{item.title}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">{item.description}</p>
                  <div className="flex flex-wrap gap-3 mb-7">
                    {item.tools.map((tool, j) => (
                      <span key={j} className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50 text-green-400 text-sm px-5 py-2.5 rounded-2xl font-black">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => seekToTimestamp(item.timestamp)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/35 to-emerald-500/35 text-green-400 hover:from-green-500/45 hover:to-emerald-500/45 border border-green-500/50 hover:border-green-400/70 px-7 py-3.5 rounded-2xl transition-all duration-300 text-base font-black hover:glow-green"
                  >
                    <Play className="w-5 h-5" />
                    {item.timestamp}
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* 器 Tab */}
          <TabsContent value="qi" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {speaker.qi.map((item, i) => (
                <div key={i} className="glass-card rounded-[2.5rem] p-7 border border-orange-500/30 relative overflow-hidden group hover:border-orange-400/60 transition-all duration-500 hover-lift hover:glow-orange">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full -translate-y-1/3 translate-x-1/3" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-white font-black text-xl group-hover:text-orange-50 transition-colors">{item.name}</h3>
                      <span className="bg-gradient-to-r from-orange-500/25 to-yellow-500/25 text-orange-400 text-xs px-3.5 py-1.5 rounded-xl border border-orange-500/40 font-bold">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-5">{item.description}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-bold transition-colors group"
                      >
                        访问官网 
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Audio Player - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-slate-700/40 px-6 py-6 z-50">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-xl shadow-blue-500/40 hover:shadow-blue-500/50 hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>
          
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
              <span className="text-slate-200 font-bold truncate flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                {speaker.name} · 完整演讲
              </span>
              <span className="font-mono flex-shrink-0 ml-3 text-slate-300 font-bold">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="relative">
              <div
                className="w-full h-2.5 bg-slate-700/60 rounded-full cursor-pointer overflow-hidden"
                onClick={(e) => {
                  if (!audioRef.current || !duration) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = ratio * duration;
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg shadow-blue-500/60 border-3 border-slate-900" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400">
            <Volume2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
