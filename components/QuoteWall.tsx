"use client";

import { Speaker } from "@/lib/types";
import Link from "next/link";
import { Sparkles, Quote, Star } from "lucide-react";

interface QuoteWallProps {
  speakers: Speaker[];
}

export default function QuoteWall({ speakers }: QuoteWallProps) {
  const quotes = speakers.flatMap((speaker) =>
    speaker.dao.map((item) => ({
      quote: item.quote,
      timestamp: item.timestamp,
      speakerName: speaker.name,
      speakerId: speaker.id,
    }))
  );

  const allQuotes = [...quotes, ...quotes, ...quotes];

  return (
    <div className="relative overflow-hidden py-10">
      {/* Gradient overlays for fade effect - Stronger */}
      <div className="absolute left-0 top-0 bottom-0 w-64 z-20 bg-gradient-to-r from-slate-950 via-slate-950/95 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-64 z-20 bg-gradient-to-l from-slate-950 via-slate-950/95 to-transparent pointer-events-none" />
      
      <div className="flex gap-10 animate-scroll">
        {allQuotes.map((item, index) => (
          <Link
            key={index}
            href={`/speaker/${item.speakerId}`}
            className="group relative flex-shrink-0"
          >
            <div className="w-[450px] glass-card rounded-[2.5rem] p-9 border border-blue-500/35 group-hover:border-blue-400/75 transition-all duration-500 hover-lift group-hover:glow-blue group-hover:glow-gold gilded-border relative overflow-hidden">
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-[2.5rem]">
                <div className="absolute inset-0 rounded-[2.5rem] border-gradient-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Decorative corner elements - More prominent */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden rounded-tr-[2.5rem]">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-bl from-blue-500/40 to-transparent rounded-full rotate-glow" />
              </div>
              <div className="absolute bottom-0 left-0 w-28 h-28 overflow-hidden rounded-bl-[2.5rem]">
                <div className="absolute -bottom-14 -left-14 w-28 h-28 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-full" />
              </div>
              
              <div className="relative z-10">
                {/* Icon row */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Quote className="w-7 h-7 text-blue-400" />
                      <div className="absolute inset-0 bg-blue-400/40 rounded-full blur-lg" />
                    </div>
                    <span className="text-xs font-black text-blue-400/90 uppercase tracking-[0.25em]">
                      金句
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                
                {/* Quote text */}
                <p className="text-white text-xl font-semibold leading-relaxed mb-7 line-clamp-3 group-hover:text-blue-50 transition-colors">
                  「{item.quote}」
                </p>
                
                {/* Speaker info */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-700/60">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse" />
                      <div className="absolute inset-0 bg-blue-400/60 rounded-full blur-md animate-ping" />
                    </div>
                    <span className="text-slate-300 text-sm font-black">{item.speakerName}</span>
                  </div>
                  <span className="text-blue-400 text-xs font-mono bg-gradient-to-r from-blue-500/25 to-cyan-500/25 px-5 py-2 rounded-full border border-blue-500/40 group-hover:border-blue-400/70 transition-all font-black">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
