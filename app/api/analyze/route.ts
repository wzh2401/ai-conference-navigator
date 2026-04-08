import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      transcript,
      apiKey,
      baseUrl = 'https://yinli.one/v1',
      model = 'claude-sonnet-4-6',
      speakerId,
      speakerName,
      speakerTitle,
      audioSrc,
    } = body;

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
      baseURL: baseUrl,
    });

    const prompt = `你是一个专业的内容分析师。请将以下演讲逐字稿按照「道·法·术·器」四层知识结构进行拆解分析。

逐字稿内容：
${transcript}

请严格按照以下JSON格式输出，不要输出任何其他内容：

{
  "dao": [
    {
      "quote": "金句原文（15-30字，直接引用原文中的核心观点）",
      "explanation": "白话解释（50-100字，解释这句话的深层含义）",
      "timestamp": "00:00:00"
    }
  ],
  "fa": [
    {
      "title": "方法论名称（如"三步选型法"）",
      "description": "一句话描述这个方法论的价值",
      "content": "详细内容，包含具体步骤或原则（可用\\n换行）",
      "timestamp": "00:00:00"
    }
  ],
  "shu": [
    {
      "step": 1,
      "title": "步骤标题",
      "description": "具体操作说明（50-100字）",
      "tools": ["涉及的工具1", "工具2"],
      "timestamp": "00:00:00"
    }
  ],
  "qi": [
    {
      "name": "工具名称",
      "category": "分类（如AI生成/视频剪辑/提示词工具）",
      "description": "用途简介（30-50字）",
      "url": ""
    }
  ]
}

要求：
- 道：提取3-5条最有价值的核心观点/金句
- 法：提取2-3个方法论或框架
- 术：提取3-5个具体可执行的操作步骤
- 器：提取所有提到的工具、软件、平台
- 时间戳尽量从原文中提取，格式为 HH:MM:SS
- 只输出JSON，不要有任何其他文字`;

    console.log('Calling AI for analysis...');

    const response = await client.chat.completions.create({
      model,
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const resultText = response.choices[0]?.message?.content || '';

    let result;
    try {
      const start = resultText.indexOf('{');
      const end = resultText.rfind('}') + 1;
      const jsonStr = resultText.slice(start, end);
      result = JSON.parse(jsonStr);
    } catch (e) {
      console.error('Failed to parse JSON, using raw output');
      return NextResponse.json({
        success: true,
        rawOutput: resultText,
        needsReview: true,
      });
    }

    const speaker = {
      id: speakerId || 'new-speaker',
      name: speakerName || '新嘉宾',
      title: speakerTitle || '嘉宾',
      avatar: '',
      audioSrc: audioSrc || '',
      dao: result.dao || [],
      fa: result.fa || [],
      shu: result.shu || [],
      qi: result.qi || [],
    };

    return NextResponse.json({
      success: true,
      speaker,
      rawOutput: resultText,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content', details: String(error) },
      { status: 500 }
    );
  }
}
