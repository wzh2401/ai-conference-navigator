import { Speaker } from "@/lib/types";
import Link from "next/link";
import { User } from "lucide-react";

interface SpeakerCardProps {
  speaker: Speaker;
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  const counts = {
    dao: speaker.dao.length,
    fa: speaker.fa.length,
    shu: speaker.shu.length,
    qi: speaker.qi.length,
  };

  return (
    <Link href={`/speaker/${speaker.id}`}>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-500 hover:bg-slate-800 transition-all duration-300 cursor-pointer group">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mb-3 group-hover:ring-2 group-hover:ring-blue-500/50 transition-all">
            {speaker.avatar ? (
              <img
                src={speaker.avatar}
                alt={speaker.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-slate-400" />
            )}
          </div>
          <h3 className="text-white font-semibold text-lg">{speaker.name}</h3>
          <p className="text-slate-400 text-sm text-center mt-1 line-clamp-2">{speaker.title}</p>
        </div>

        {/* Layer counts */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="flex flex-col items-center bg-blue-500/10 rounded-lg py-2">
            <span className="text-blue-400 font-bold text-lg">{counts.dao}</span>
            <span className="text-blue-400/70 text-xs">道</span>
          </div>
          <div className="flex flex-col items-center bg-purple-500/10 rounded-lg py-2">
            <span className="text-purple-400 font-bold text-lg">{counts.fa}</span>
            <span className="text-purple-400/70 text-xs">法</span>
          </div>
          <div className="flex flex-col items-center bg-green-500/10 rounded-lg py-2">
            <span className="text-green-400 font-bold text-lg">{counts.shu}</span>
            <span className="text-green-400/70 text-xs">术</span>
          </div>
          <div className="flex flex-col items-center bg-orange-500/10 rounded-lg py-2">
            <span className="text-orange-400 font-bold text-lg">{counts.qi}</span>
            <span className="text-orange-400/70 text-xs">器</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
