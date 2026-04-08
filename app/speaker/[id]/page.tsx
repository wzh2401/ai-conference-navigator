import { speakers as staticSpeakers } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import SpeakerDetail from "@/components/SpeakerDetail";
import type { Speaker } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getSpeaker(id: string): Promise<Speaker | null> {
  try {
    if (!supabase) return staticSpeakers.find((s) => s.id === id) || null;

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return staticSpeakers.find((s) => s.id === id) || null;
    }

    return {
      id: data.id,
      name: data.name,
      title: data.title,
      avatar: data.avatar || '',
      audioSrc: data.audio_src || '',
      dao: data.dao || [],
      fa: data.fa || [],
      shu: data.shu || [],
      qi: data.qi || [],
    };
  } catch {
    return staticSpeakers.find((s) => s.id === id) || null;
  }
}

export default async function SpeakerPage({ params }: PageProps) {
  const { id } = await params;
  const speaker = await getSpeaker(id);

  if (!speaker) {
    notFound();
  }

  return <SpeakerDetail speaker={speaker} />;
}
