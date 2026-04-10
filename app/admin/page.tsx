'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
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
  Loader2,
  Edit3,
  Trash2,
  Copy,
  Database,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploading, setUploading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [transcribeApiKey, setTranscribeApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://yinli.one/v1');
  const [model, setModel] = useState('claude-3-5-sonnet-20241022');
  const [speakerId, setSpeakerId] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerTitle, setSpeakerTitle] = useState('');
  const [dbSpeakers, setDbSpeakers] = useState<any[]>([]);
  const [loadingDB, setLoadingDB] = useState(false);

  const loadSpeakers = useCallback(async () => {
    setLoadingDB(true);
    try {
      const res = await fetch('/api/speakers');
      const data = await res.json();
      if (data.speakers) setDbSpeakers(data.speakers);
    } catch (e) {
      console.error('Failed to load speakers:', e);
    } finally {
      setLoadingDB(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'review') {
      loadSpeakers();
    }
  }, [activeTab, loadSpeakers]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      alert('Supabase 未配置，请检查环境变量');
      return;
    }

    setOriginalFile(file);
    setUploading(true);
    try {
      const timestamp = Date.now();
      const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const path = `${timestamp}-${safeFilename}`;

      // 直接从浏览器上传到 Supabase Storage，完全绕过 Vercel
      const { error } = await supabase.storage
        .from('audio-files')
        .upload(path, file, { contentType: file.type, upsert: false });

      if (error) throw new Error(error.message);

      const { data: { publicUrl } } = supabase.storage
        .from('audio-files')
        .getPublicUrl(path);

      setUploadedFile({
        success: true,
        url: publicUrl,
        originalName: file.name,
        isVideo: false,
      });
      alert('音频上传成功！');
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert('上传失败：' + (error.message || '未知错误'));
    } finally {
      setUploading(false);
    }
  };

  const handleTranscribe = async () => {
    if (!originalFile) {
      alert('请先上传音频文件');
      return;
    }
    const key = transcribeApiKey || apiKey;
    if (!key) {
      alert('请先在「配置」tab 填入 API Key');
      return;
    }

    setTranscribing(true);
    try {
      const fd = new FormData();
      fd.append('file', originalFile);
      fd.append('model', 'whisper-1');
      fd.append('language', 'zh');
      fd.append('prompt', '以下是普通话演讲内容，请使用简体中文转写。');

      const response = await fetch(`${baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}` },
        body: fd,
      });

      const result = await response.json();
      if (result.text) {
        setTranscript(result.text);
        setActiveTab('process');
      } else {
        alert('转写失败：' + (result.error?.message || JSON.stringify(result)));
      }
    } catch (error) {
      console.error('Transcribe failed:', error);
      alert('转写失败，请检查网络或API配置');
    } finally {
      setTranscribing(false);
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
      } else {
        alert('AI分析失败：' + (result.error || '未知错误'));
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('AI分析失败，请检查API配置');
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!analysisResult?.speaker) return;

    setSaving(true);
    try {
      const response = await fetch('/api/speakers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...analysisResult.speaker,
          audioSrc: uploadedFile?.url || analysisResult.speaker.audioSrc || '',
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('保存成功！嘉宾数据已写入数据库。');
      } else {
        alert('保存失败：' + (result.error || '未知错误'));
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`确定要删除嘉宾「${name}」吗？此操作不可撤销。`)) return;

    try {
      const response = await fetch(`/api/speakers?id=${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        setDbSpeakers((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert('删除失败：' + (result.error || '未知错误'));
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('删除失败');
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
            {[
              { key: 'upload', label: '音频上传', icon: Upload, color: 'blue' },
              { key: 'process', label: 'AI拆解', icon: Sparkles, color: 'purple' },
              { key: 'review', label: '内容审核', icon: CheckCircle, color: 'green' },
              { key: 'settings', label: '配置', icon: Settings, color: 'orange' },
            ].map(({ key, label, icon: Icon, color }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === key
                    ? `bg-gradient-to-r from-${color}-500/30 to-${color}-400/30 text-${color}-400 border border-${color}-500/40 shadow-lg shadow-${color}-500/20`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card rounded-3xl p-8 border border-slate-700/40">
          {activeTab === 'upload' && (
            <UploadTab
              uploading={uploading}
              transcribing={transcribing}
              onFileUpload={handleFileUpload}
              onTranscribe={handleTranscribe}
              uploadedFile={uploadedFile}
            />
          )}
          {activeTab === 'process' && (
            <ProcessTab
              processing={processing}
              saving={saving}
              onAnalyze={handleAnalyze}
              onSave={handleSave}
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
            <ReviewTab
              speakers={dbSpeakers}
              loading={loadingDB}
              onDelete={handleDelete}
              onRefresh={loadSpeakers}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab
              apiKey={apiKey}
              setApiKey={setApiKey}
              transcribeApiKey={transcribeApiKey}
              setTranscribeApiKey={setTranscribeApiKey}
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
  transcribing,
  onFileUpload,
  onTranscribe,
  uploadedFile,
}: {
  uploading: boolean;
  transcribing: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTranscribe: () => void;
  uploadedFile: any;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">音频/视频上传</h2>

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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/30"
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
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-green-500/40 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
            <div>
              <p className="text-white font-bold flex items-center gap-2">
                {uploadedFile.originalName}
                {uploadedFile.isVideo && (
                  <span className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full">
                    视频文件
                  </span>
                )}
              </p>
              <p className="text-slate-400 text-sm break-all">{uploadedFile.url}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm mb-3">音频上传成功！下一步：自动转写为逐字稿</p>
            <button
              onClick={onTranscribe}
              disabled={transcribing}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {transcribing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  转写中，请稍候...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  一键转写逐字稿
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProcessTab({
  processing,
  saving,
  onAnalyze,
  onSave,
  transcript,
  setTranscript,
  speakerId,
  setSpeakerId,
  speakerName,
  setSpeakerName,
  speakerTitle,
  setSpeakerTitle,
  analysisResult,
  copyToClipboard,
}: {
  processing: boolean;
  saving: boolean;
  onAnalyze: () => void;
  onSave: () => void;
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
            placeholder="zhang-wei"
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

      <button
        onClick={onAnalyze}
        disabled={processing || !transcript}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {analysisResult && (
        <div className="mt-8 pt-8 border-t border-slate-700/50">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              分析完成！
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(JSON.stringify(analysisResult.speaker, null, 2))}
                className="inline-flex items-center gap-2 bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700/50 hover:border-slate-600 px-4 py-2 rounded-xl transition-all"
              >
                <Copy className="w-4 h-4" />
                复制JSON
              </button>
              <button
                onClick={onSave}
                disabled={saving}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black px-6 py-2 rounded-xl transition-all shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    保存到数据库
                  </>
                )}
              </button>
            </div>
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

function ReviewTab({
  speakers,
  loading,
  onDelete,
  onRefresh,
}: {
  speakers: any[];
  loading: boolean;
  onDelete: (id: string, name: string) => void;
  onRefresh: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">内容审核</h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-slate-800/50 text-slate-300 hover:text-white border border-slate-700/50 px-4 py-2 rounded-xl transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          刷新
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
          加载中...
        </div>
      ) : speakers.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>数据库中暂无嘉宾数据</p>
          <p className="text-sm mt-1">请先在「AI拆解」页面分析并保存嘉宾内容</p>
        </div>
      ) : (
        <div className="space-y-4">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-black text-xl">{speaker.name}</h3>
                  <p className="text-slate-400">{speaker.title}</p>
                  <p className="text-slate-600 text-xs mt-1">ID: {speaker.id}</p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/speaker/${speaker.id}`}
                    target="_blank"
                    className="p-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
                  >
                    <Edit3 className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => onDelete(speaker.id, speaker.name)}
                    className="p-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center bg-blue-500/10 rounded-xl py-2 border border-blue-500/20">
                  <span className="text-blue-400 font-black text-lg">{speaker.dao?.length || 0}</span>
                  <span className="text-blue-400/70 text-xs block">道</span>
                </div>
                <div className="text-center bg-purple-500/10 rounded-xl py-2 border border-purple-500/20">
                  <span className="text-purple-400 font-black text-lg">{speaker.fa?.length || 0}</span>
                  <span className="text-purple-400/70 text-xs block">法</span>
                </div>
                <div className="text-center bg-green-500/10 rounded-xl py-2 border border-green-500/20">
                  <span className="text-green-400 font-black text-lg">{speaker.shu?.length || 0}</span>
                  <span className="text-green-400/70 text-xs block">术</span>
                </div>
                <div className="text-center bg-orange-500/10 rounded-xl py-2 border border-orange-500/20">
                  <span className="text-orange-400 font-black text-lg">{speaker.qi?.length || 0}</span>
                  <span className="text-orange-400/70 text-xs block">器</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab({
  apiKey,
  setApiKey,
  transcribeApiKey,
  setTranscribeApiKey,
  baseUrl,
  setBaseUrl,
  model,
  setModel,
}: {
  apiKey: string;
  setApiKey: (v: string) => void;
  transcribeApiKey: string;
  setTranscribeApiKey: (v: string) => void;
  baseUrl: string;
  setBaseUrl: (v: string) => void;
  model: string;
  setModel: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">配置</h2>

      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400" />
          API 配置
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm mb-2 block font-bold">API Key <span className="text-slate-500 font-normal">（用 default 分组的 Key，转写和分析共用）</span></label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setTranscribeApiKey(e.target.value); }}
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

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
        <p className="text-blue-300 text-sm">
          配置会话级别保存，刷新页面后需重新填写。如需持久化，请将 API Key 配置到 Vercel 环境变量 <code className="bg-slate-800 px-1 rounded">OPENAI_API_KEY</code> 中。
        </p>
      </div>
    </div>
  );
}
