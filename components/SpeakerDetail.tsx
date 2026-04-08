"use client";

import { Speaker } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Play, Pause, Volume2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";

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
    <div className="min-h-screen bg-slate-900 pb-32">
      <audio
        ref={audioRef}
        src={speaker.audioSrc}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Header */}
      <div className="bg-slate-800/80 border-b border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>

      {/* Speaker Info */}
      <div className="max-w-4xl mx-auto px-6 py-10 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center">
          {speaker.avatar ? (
            <img src={speaker.avatar} alt={speaker.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-slate-400" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{speaker.name}</h1>
          <p className="text-slate-400 mt-1">{speaker.title}</p>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline" className="text-blue-400 border-blue-400/30 text-xs">
              道 {speaker.dao.length}
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400/30 text-xs">
              法 {speaker.fa.length}
            </Badge>
            <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs">
              术 {speaker.shu.length}
            </Badge>
            <Badge variant="outline" className="text-orange-400 border-orange-400/30 text-xs">
              器 {speaker.qi.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6">
        <Tabs defaultValue="dao">
          <TabsList className="bg-slate-800 border border-slate-700 mb-6">
            <TabsTrigger value="dao" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              道 · 认知
            </TabsTrigger>
            <TabsTrigger value="fa" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              法 · 方法论
            </TabsTrigger>
            <TabsTrigger value="shu" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              术 · 技巧
            </TabsTrigger>
            <TabsTrigger value="qi" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
              器 · 工具
            </TabsTrigger>
          </TabsList>

          {/* 道 Tab */}
          <TabsContent value="dao" className="space-y-4">
            {speaker.dao.map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 border-l-4 border-l-blue-500">
                <p className="text-white text-xl font-semibold leading-relaxed mb-3">
                  「{item.quote}」
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.explanation}</p>
                <button
                  onClick={() => seekToTimestamp(item.timestamp)}
                  className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors text-xs font-mono"
                >
                  <Play className="w-3 h-3" />
                  {item.timestamp}
                </button>
              </div>
            ))}
          </TabsContent>

          {/* 法 Tab */}
          <TabsContent value="fa">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {speaker.fa.map((item, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 border-t-4 border-t-purple-500">
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-purple-400 text-sm mb-4">{item.description}</p>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                  <button
                    onClick={() => seekToTimestamp(item.timestamp)}
                    className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors text-xs font-mono mt-4"
                  >
                    <Play className="w-3 h-3" />
                    {item.timestamp}
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 术 Tab */}
          <TabsContent value="shu" className="space-y-4">
            {speaker.shu.map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <span className="text-green-400 font-bold">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tools.map((tool, j) => (
                      <span key={j} className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => seekToTimestamp(item.timestamp)}
                    className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors text-xs font-mono"
                  >
                    <Play className="w-3 h-3" />
                    {item.timestamp}
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* 器 Tab */}
          <TabsContent value="qi">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {speaker.qi.map((item, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 border-t-4 border-t-orange-500">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <span className="text-orange-400/70 text-xs bg-orange-500/10 px-2 py-0.5 rounded ml-2 flex-shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 text-xs mt-3 inline-block transition-colors"
                    >
                      访问官网 →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Audio Player - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur border-t border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="text-slate-300 font-medium truncate">{speaker.name} · 完整演讲</span>
              <span className="font-mono flex-shrink-0 ml-2">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div
              className="w-full h-1.5 bg-slate-700 rounded-full cursor-pointer"
              onClick={(e) => {
                if (!audioRef.current || !duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = ratio * duration;
              }}
            >
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <Volume2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
