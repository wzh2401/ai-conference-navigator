import OpenAI from 'openai';
import { createReadStream, existsSync } from 'fs';

const apiKey = process.argv[2];
if (!apiKey) { console.error('用法: node scripts/test-whisper.mjs <api-key>'); process.exit(1); }

const testFile = 'D:/桌面/37046847548-1-192.mp3';
if (!existsSync(testFile)) { console.error('找不到文件:', testFile); process.exit(1); }

console.log('测试文件:', testFile);
console.log('正在调用 Whisper...');

const client = new OpenAI({ apiKey, baseURL: 'https://yinli.one/v1' });

try {
  const t = await client.audio.transcriptions.create({
    file: createReadStream(testFile),
    model: 'whisper-1',
    language: 'zh',
  });
  console.log('✅ 成功！前100字：', t.text.slice(0, 100));
} catch (e) {
  console.error('❌ 失败：', e.message || e);
}
