'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Upload, 
  FileAudio, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Terminal, 
  Save, 
  ArrowLeft, 
  FileText,
  Loader2,
  Edit3,
  Trash2,
  Copy
} from 'lucide-react';
import { speakers } from '@/lib/data';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://yinli.one/v1');
  const [model, setModel] = useState('claude-sonnet-4-6');
  const [speakerId, setSpeakerId] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerTitle, setSpeakerTitle] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setUploadedFile(result);
        alert('文件上传成功！');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('文件上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!transcript) {
      alert('请先输入逐字稿内容');
      return;
    }

    setProcessing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          apiKey,
          baseUrl,
          model,
          speakerId,
          speakerName,
          speakerTitle,
          audioSrc: uploadedFile?.url || '',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setAnalysisResult(result);
        alert('AI分析完成！');
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('AI分析失败');
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 font-bold"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-800/60 flex items-center justify-center border border-slate-700/50 hover:border-blue-500/40 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span>返回首页</span>
          </Link>
        </div>
        
        {/* Header */}
        <div className="glass-card rounded-3xl p-8 border border-slate-700/40 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-black text-white neon-blue">管理后台</h1>
          </div>
          <p className="text-slate-400">音频上传 · AI拆解 · 内容审核</p>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-3xl p-4 border border-slate-700/40 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Upload className="w-5 h-5" />
              音频上传
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'process'
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-400 border border-purple-500/40 shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              AI拆解
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'review'
                  ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-400 border border-green-500/40 shadow-lg shadow-green-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              内容审核
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-400 border border-orange-500/40 shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Settings className="w-5 h-5" />
              配置
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card rounded-3xl p-8 border border-slate-700/40">
          {activeTab === 'upload' && (
            <UploadTab 
              uploading={uploading} 
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFile}
            />
          )}
          {activeTab === 'process' && (
            <ProcessTab 
              processing={processing}
              onAnalyze={handleAnalyze}
              transcript={transcript}
              setTranscript={setTranscript}
              speakerId={speakerId}
              setSpeakerId={setSpeakerId}
              speakerName={speakerName}
              setSpeakerName={setSpeakerName}
              speakerTitle={speakerTitle}
              setSpeakerTitle={setSpeakerTitle}
              analysisResult={analysisResult}
              copyToClipboard={copyToClipboard}
            />
          )}
          {activeTab === 'review' && (
            <ReviewTab speakers={speakers} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab 
              apiKey={apiKey}
              setApiKey={setApiKey}
              baseUrl={baseUrl}
              setBaseUrl={setBaseUrl}
              model={model}
              setModel={setModel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function UploadTab({ 
  uploading, 
  onFileUpload, 
  uploadedFile 
}: { 
  uploading: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFile: any;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">音频上传</h2>
      
      <div className="border-2 border-dashed border-blue-500/40 rounded-3xl p-12 text-center hover:border-blue-400/60 transition-all duration-300 bg-blue-500/5">
        <FileAudio className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-black text-white mb-2">上传音频文件</h3>
        <p className="text-slate-400 mb-6">支持 MP3, WAV, M4A 格式</p>
        <input
          type="file"
          accept="audio/*"
          onChange={onFileUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/30 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              上传中...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              选择文件
            </>
          )}
        </label>
      </div>

      {uploadedFile && (
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-green-500/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-white font-bold">{uploadedFile.originalName}</p>
                <p className="text-slate-400 text-sm">{uploadedFile.url}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessTab({ 
  processing, 
  onAnalyze, 
  transcript, 
  setTranscript,
  speakerId,
  setSpeakerId,
  speakerName,
  setSpeakerName,
  speakerTitle,
  setSpeakerTitle,
  analysisResult,
  copyToClipboard
}: { 
  processing: boolean;
  onAnalyze: () => void;
  transcript: string;
  setTranscript: (v: string) => void;
  speakerId: string;
  setSpeakerId: (v: string) => void;
  speakerName: string;
  setSpeakerName: (v: string) => void;
  speakerTitle: string;
  setSpeakerTitle: (v: string) => void;
  analysisResult: any;
  copyToClipboard: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">AI拆解</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-slate-400 text-sm mb-2 block font-bold">嘉宾ID</label>
          <input
            type="text"
            value={speakerId}
            onChange={(e) => setSpeakerId(e.target.value)}
            placeholder="speaker-id"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <div>
          <label className="text-slate-400 text-sm mb-2 block font-bold">嘉宾姓名</label>
          <input
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
            placeholder="张三"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <div>
          <label className="text-slate-400 text-sm mb-2 block font-bold">嘉宾头衔</label>
          <input
            type="text"
            value={speakerTitle}
            onChange={(e) => setSpeakerTitle(e.target.value)}
            placeholder="AI创业者"
            className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
          />
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-slate-400 text-sm font-bold">逐字稿内容</label>
          <span className="text-slate-500 text-xs">{transcript.length} 字</span>
        </div>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="粘贴演讲逐字稿内容..."
          rows={12}
          className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 resize-none"
        />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={onAnalyze}
          disabled={processing || !transcript}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI分析中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              开始拆解
            </>
          )}
        </button>
      </div>

      {analysisResult && (
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              分析完成！
            </h3>
            <button
              onClick={() => copyToClipboard(JSON.stringify(analysisResult.speaker, null, 2))}
              className="inline-flex items-center gap-2 bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 px-4 py-2 rounded-xl transition-all"
            >
              <Copy className="w-4 h-4" />
              复制JSON
            </button>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
            <pre className="text-slate-300 text-sm overflow-auto max-h-96">
              {JSON.stringify(analysisResult.speaker, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewTab({ speakers }: { speakers: any[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">内容审核</h2>
      
      <div className="space-y-4">
        {speakers.map((speaker, index) => (
          <div key={speaker.id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-black text-xl">{speaker.name}</h3>
                <p className="text-slate-400">{speaker.title}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all">
                  <Edit3 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button className="p-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center bg-blue-500/10 rounded-xl py-2 border border-blue-500/20">
                <span className="text-blue-400 font-black text-lg">{speaker.dao.length}</span>
                <span className="text-blue-400/70 text-xs block">道</span>
              </div>
              <div className="text-center bg-purple-500/10 rounded-xl py-2 border border-purple-500/20">
                <span className="text-purple-400 font-black text-lg">{speaker.fa.length}</span>
                <span className="text-purple-400/70 text-xs block">法</span>
              </div>
              <div className="text-center bg-green-500/10 rounded-xl py-2 border border-green-500/20">
                <span className="text-green-400 font-black text-lg">{speaker.shu.length}</span>
                <span className="text-green-400/70 text-xs block">术</span>
              </div>
              <div className="text-center bg-orange-500/10 rounded-xl py-2 border border-orange-500/20">
                <span className="text-orange-400 font-black text-lg">{speaker.qi.length}</span>
                <span className="text-orange-400/70 text-xs block">器</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({ 
  apiKey, 
  setApiKey, 
  baseUrl, 
  setBaseUrl, 
  model, 
  setModel 
}: { 
  apiKey: string;
  setApiKey: (v: string) => void;
  baseUrl: string;
  setBaseUrl: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">配置</h2>
      
      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-orange-400" />
            API 配置
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-bold">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-bold">Base URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.example.com/v1"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block font-bold">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="claude-sonnet-4-6"
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
        </div>
        
        <button className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/30">
          <Save className="w-5 h-5" />
          保存配置
        </button>
      </div>
    </div>
  );
}
