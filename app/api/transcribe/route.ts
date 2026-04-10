import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const apiKey = formData.get('apiKey') as string;
    const baseUrl = (formData.get('baseUrl') as string) || 'https://yinli.one/v1';

    if (!file) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }

    const client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      baseURL: baseUrl,
    });

    const transcription = await client.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      language: 'zh',
      prompt: '以下是普通话演讲内容，请使用简体中文转写。',
    });

    return NextResponse.json({ success: true, transcript: transcription.text });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: '转写失败', details: String(error) },
      { status: 500 }
    );
  }
}
