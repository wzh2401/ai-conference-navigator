import json
import sys
from docx import Document
from openai import OpenAI

# ===== 配置 =====
API_KEY = "把你的引力AI key填在这里"
BASE_URL = "https://yinli.one/v1"
MODEL = "claude-sonnet-4-6"
DOCX_PATH = r"D:\桌面\【实拍已死？】100万预算全AI广告幕后是什么样的？ [BV1sN1iBREBE]_原文.docx"
SPEAKER_ID = "ai-video-creator"
SPEAKER_NAME = "AI视频博主"
SPEAKER_TITLE = "百万预算AI广告制作人"
AUDIO_SRC = "/audio/ai-video.mp3"
# ================

def read_docx(path):
    doc = Document(path)
    lines = []
    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            lines.append(text)
    return "\n".join(lines)

def analyze_with_ai(transcript):
    client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

    prompt = f"""你是一个专业的内容分析师。请将以下演讲逐字稿按照「道·法·术·器」四层知识结构进行拆解分析。

逐字稿内容：
{transcript}

请严格按照以下JSON格式输出，不要输出任何其他内容：

{{
  "dao": [
    {{
      "quote": "金句原文（15-30字，直接引用原文中的核心观点）",
      "explanation": "白话解释（50-100字，解释这句话的深层含义）",
      "timestamp": "00:00:00"
    }}
  ],
  "fa": [
    {{
      "title": "方法论名称（如"三步选型法"）",
      "description": "一句话描述这个方法论的价值",
      "content": "详细内容，包含具体步骤或原则（可用\\n换行）",
      "timestamp": "00:00:00"
    }}
  ],
  "shu": [
    {{
      "step": 1,
      "title": "步骤标题",
      "description": "具体操作说明（50-100字）",
      "tools": ["涉及的工具1", "工具2"],
      "timestamp": "00:00:00"
    }}
  ],
  "qi": [
    {{
      "name": "工具名称",
      "category": "分类（如AI生成/视频剪辑/提示词工具）",
      "description": "用途简介（30-50字）",
      "url": ""
    }}
  ]
}}

要求：
- 道：提取3-5条最有价值的核心观点/金句
- 法：提取2-3个方法论或框架
- 术：提取3-5个具体可执行的操作步骤
- 器：提取所有提到的工具、软件、平台
- 时间戳尽量从原文中提取，格式为 HH:MM:SS
- 只输出JSON，不要有任何其他文字"""

    print("正在调用 AI 分析中，请稍候...")

    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content

def main():
    print(f"读取文件: {DOCX_PATH}")
    transcript = read_docx(DOCX_PATH)
    print(f"读取成功，共 {len(transcript)} 字")
    print("前200字预览:", transcript[:200])
    print("---")

    result_text = analyze_with_ai(transcript)

    try:
        start = result_text.find('{')
        end = result_text.rfind('}') + 1
        json_str = result_text[start:end]
        result = json.loads(json_str)
    except Exception as e:
        print(f"JSON解析失败: {e}")
        print("原始输出:", result_text)
        sys.exit(1)

    speaker = {
        "id": SPEAKER_ID,
        "name": SPEAKER_NAME,
        "title": SPEAKER_TITLE,
        "avatar": "",
        "audioSrc": AUDIO_SRC,
        "dao": result.get("dao", []),
        "fa": result.get("fa", []),
        "shu": result.get("shu", []),
        "qi": result.get("qi", [])
    }

    output_path = "scripts/output_speaker.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(speaker, f, ensure_ascii=False, indent=2)

    print(f"\n分析完成！")
    print(f"道（金句）: {len(speaker['dao'])} 条")
    print(f"法（方法论）: {len(speaker['fa'])} 条")
    print(f"术（技巧）: {len(speaker['shu'])} 条")
    print(f"器（工具）: {len(speaker['qi'])} 条")
    print(f"\n结果已保存到: {output_path}")

if __name__ == "__main__":
    main()
