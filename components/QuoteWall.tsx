"use client";

import { Speaker } from "@/lib/types";
import Link from "next/link";

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

  // Duplicate for seamless loop
  const allQuotes = [...quotes, ...quotes];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex gap-6 animate-scroll">
        {allQuotes.map((item, index) => (
          <Link
            key={index}
            href={`/speaker/${item.speakerId}`}
            className="flex-shrink-0 w-80 bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 cursor-pointer group"
          >
            <p className="text-white text-sm font-medium leading-relaxed mb-4 line-clamp-2">
              「{item.quote}」
            </p>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs">{item.speakerName}</span>
              <span className="text-blue-400 text-xs font-mono">{item.timestamp}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
