import { speakers } from "@/lib/data";
import { notFound } from "next/navigation";
import SpeakerDetail from "@/components/SpeakerDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SpeakerPage({ params }: PageProps) {
  const { id } = await params;
  const speaker = speakers.find((s) => s.id === id);

  if (!speaker) {
    notFound();
  }

  return <SpeakerDetail speaker={speaker} />;
}

export function generateStaticParams() {
  return speakers.map((s) => ({ id: s.id }));
}
