import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

function rowToSpeaker(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    avatar: row.avatar,
    audioSrc: row.audio_src,
    dao: row.dao || [],
    fa: row.fa || [],
    shu: row.shu || [],
    qi: row.qi || [],
  };
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ speakers: [], error: 'Supabase 未配置' });
  }

  const { data, error } = await supabase
    .from('speakers')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ speakers: (data || []).map(rowToSpeaker) });
}

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase 未配置，请先设置环境变量' }, { status: 503 });
  }

  const body = await request.json();
  const { id, name, title, avatar, audioSrc, dao, fa, shu, qi } = body;

  if (!id || !name) {
    return NextResponse.json({ error: '嘉宾ID和姓名不能为空' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('speakers')
    .upsert({
      id,
      name,
      title: title || '',
      avatar: avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${id}&backgroundColor=1e293b`,
      audio_src: audioSrc || '',
      dao: dao || [],
      fa: fa || [],
      shu: shu || [],
      qi: qi || [],
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, speaker: rowToSpeaker(data) });
}

export async function DELETE(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase 未配置，请先设置环境变量' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: '缺少嘉宾ID' }, { status: 400 });
  }

  const { error } = await supabase
    .from('speakers')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
