import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase 未配置' }, { status: 503 });
  }

  const { filename, contentType } = await request.json();

  const timestamp = Date.now();
  const safeFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${timestamp}-${safeFilename}`;

  const { data, error } = await supabase.storage
    .from('audio-files')
    .createSignedUploadUrl(path);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage
    .from('audio-files')
    .getPublicUrl(path);

  return NextResponse.json({
    signedUrl: data.signedUrl,
    path,
    publicUrl,
  });
}
