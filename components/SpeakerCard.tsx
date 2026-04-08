import { Speaker } from "@/lib/types";
import Link from "next/link";
import { User, ArrowRight, BookOpen, Lightbulb, Wrench, Settings, Sparkles, Star } from "lucide-react";

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

  const layerIcons = {
    dao: <BookOpen className="w-4 h-4" />,
    fa: <Lightbulb className="w-4 h-4" />,
    shu: <Wrench className="w-4 h-4" />,
    qi: <Settings className="w-4 h-4" />,
  };

  return (
    <Link href={`/speaker/${speaker.id}`} className="group block">
      <div className="glass-card rounded-[2.5rem] p-9 border border-slate-700/40 group-hover:border-blue-500/70 transition-all duration-500 hover-lift group-hover:glow-blue group-hover:glow-gold gilded-border relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Decorative corner */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full group-hover:scale-150 transition-transform duration-700 delay-100" />
        
        {/* Border gradient */}
        <div className="absolute inset-0 rounded-[2.5rem] border-gradient-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10">
          {/* Avatar + Name Section */}
          <div className="flex flex-col items-center mb-9">
            <div className="relative mb-6">
              {/* Outer ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 group-hover:opacity-80 blur-xl transition-opacity duration-500" />
              {/* Rotating ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-500/40 rotate-glow" />
              {/* Second rotating ring */}
              <div className="absolute -inset-6 rounded-full border border-purple-500/30 rotate-glow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              
              <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border-3 border-slate-600 group-hover:border-blue-500/80 transition-all duration-300 group-hover:glow-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {speaker.avatar ? (
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-full h-full rounded-[2.5rem] object-cover relative z-10"
                  />
                ) : (
                  <User className="w-14 h-14 text-slate-400 group-hover:text-blue-400 transition-colors relative z-10" />
                )}
              </div>
            </div>
            
            <h3 className="text-white font-black text-2xl mb-2 group-hover:text-blue-50 transition-colors flex items-center gap-2">
              {speaker.name}
              <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Star className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
            </h3>
            <p className="text-slate-400 text-sm text-center leading-relaxed max-w-[220px]">
              {speaker.title}
            </p>
          </div>

          {/* Layer counts */}
          <div className="grid grid-cols-4 gap-3 mb-9">
            <div className="flex flex-col items-center bg-gradient-to-br from-blue-500/25 to-blue-600/15 rounded-2xl py-4 px-2 border border-blue-500/40 group-hover:border-blue-500/70 transition-all duration-300 group-hover:glow-blue">
              <div className="text-blue-400 mb-2">{layerIcons.dao}</div>
              <span className="text-blue-400 font-black text-2xl">{counts.dao}</span>
              <span className="text-blue-400/90 text-xs mt-1 font-bold">道</span>
            </div>
            
            <div className="flex flex-col items-center bg-gradient-to-br from-purple-500/25 to-purple-600/15 rounded-2xl py-4 px-2 border border-purple-500/40 group-hover:border-purple-500/70 transition-all duration-300 group-hover:glow-purple">
              <div className="text-purple-400 mb-2">{layerIcons.fa}</div>
              <span className="text-purple-400 font-black text-2xl">{counts.fa}</span>
              <span className="text-purple-400/90 text-xs mt-1 font-bold">法</span>
            </div>
            
            <div className="flex flex-col items-center bg-gradient-to-br from-green-500/25 to-green-600/15 rounded-2xl py-4 px-2 border border-green-500/40 group-hover:border-green-500/70 transition-all duration-300 group-hover:glow-green">
              <div className="text-green-400 mb-2">{layerIcons.shu}</div>
              <span className="text-green-400 font-black text-2xl">{counts.shu}</span>
              <span className="text-green-400/90 text-xs mt-1 font-bold">术</span>
            </div>
            
            <div className="flex flex-col items-center bg-gradient-to-br from-orange-500/25 to-orange-600/15 rounded-2xl py-4 px-2 border border-orange-500/40 group-hover:border-orange-500/70 transition-all duration-300 group-hover:glow-orange">
              <div className="text-orange-400 mb-2">{layerIcons.qi}</div>
              <span className="text-orange-400 font-black text-2xl">{counts.qi}</span>
              <span className="text-orange-400/90 text-xs mt-1 font-bold">器</span>
            </div>
          </div>

          {/* View details button */}
          <div className="flex items-center justify-center gap-3 text-slate-400 text-sm group-hover:text-blue-400 transition-colors font-bold">
            <span>查看详情</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}
