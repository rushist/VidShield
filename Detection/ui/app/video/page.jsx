'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Video, RefreshCw, Download, AlertTriangle, CheckCircle, ArrowLeft, Activity } from 'lucide-react';
import ScoreRing from '../../components/ScoreRing';
import { getApiBaseUrl } from '../config';

export default function VideoDetector() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const progressTimerRef = useRef(null);

  const reset = () => {
    clearInterval(progressTimerRef.current);
    setFile(null);
    setIsProcessing(false);
    setProgress(0);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFile = async (uploadedFile) => {
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setError(null);
    setResult(null);
    setIsProcessing(true);
    setProgress(10);

    // Smooth simulated progress up to 90%
    let currentProgress = 10;
    progressTimerRef.current = setInterval(() => {
      currentProgress = Math.min(currentProgress + Math.max(1, Math.round((90 - currentProgress) / 8)), 90);
      setProgress(currentProgress);
    }, 250);

    try {
      const baseUrl = getApiBaseUrl();
      const endpoint = `${baseUrl}/api/analyze`;
      const form = new FormData();
      form.append('file', uploadedFile);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: form,
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`API at ${endpoint} returned a non-JSON response. Check if your backend server is running.`);
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'The video analysis backend returned an error.');
      }

      clearInterval(progressTimerRef.current);
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setResult(data);
      }, 300);

    } catch (err) {
      clearInterval(progressTimerRef.current);
      setIsProcessing(false);
      let msg = err.message || 'Unable to connect to the video analysis backend.';
      if (err.name === 'TypeError' && msg.includes('fetch')) {
        msg = `Could not connect to backend server at ${getApiBaseUrl()}. Ensure your backend API is online.`;
      }
      setError(msg);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const downloadReport = () => {
    if (!result || !file) return;
    const text = `VIDSHIELD VIDEO DEEPFAKE ANALYSIS REPORT\n\nFile: ${file.name}\nModel: ${result.model}\nResult: ${result.label.toUpperCase()}\nDeepfake probability: ${(result.fake_probability * 100).toFixed(2)}%\nAuthentic probability: ${(result.authentic_probability * 100).toFixed(2)}%\nProcessing time: ${(result.processing_time_ms / 1000).toFixed(2)}s\nSampled frames: ${result.sampled_frames || 16}\n\nNote: This result is an assistive signal, not proof of identity or authenticity.`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vidshield-video-report-${file.name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#74e3d2] transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Overview
      </Link>

      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#74e3d2] text-xs font-mono tracking-widest uppercase">
            <Activity className="w-3.5 h-3.5" /> Video Swin Small
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Analyze temporal <br />
            <em className="not-italic text-[#74e3d2] font-normal">video sequences.</em>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            Upload a video clip to analyze frame-to-frame motion consistency and temporal deepfake artifacts.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 font-mono text-xs text-slate-300 space-y-1 min-w-[220px]">
          <span className="text-slate-500 uppercase tracking-widest block text-[10px]">Model Architecture</span>
          <span className="text-white font-semibold text-sm block">Video Swin Small</span>
          <span className="text-[#74e3d2]">16 frames sampling · 3D Swin</span>
        </div>
      </div>

      {/* Main Detector Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Dropzone Pane */}
        <div className="md:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">01 / Input Video File</span>
          
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`min-h-[300px] p-8 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden ${
              isDragging
                ? 'border-[#74e3d2] bg-teal-500/10 shadow-[0_0_30px_rgba(116,227,210,0.15)]'
                : 'border-slate-800 hover:border-teal-500/40 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/mov,video/webm,video/avi"
              className="hidden"
              onChange={(e) => e.target.files && processFile(e.target.files[0])}
            />

            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-400/30 flex items-center justify-center text-[#74e3d2] mb-4 shadow-[0_0_15px_rgba(116,227,210,0.2)]">
              <Upload className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              {file ? file.name : 'Drop video file here'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              MP4, MOV, WEBM, AVI · Up to 500 MB
            </p>

            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-[#74e3d2] border border-teal-500/30 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Output & Analysis Pane */}
        <div className="md:col-span-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">02 / Forensic Result</span>

          <div className="min-h-[300px] p-8 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl flex flex-col justify-center relative overflow-hidden">
            {/* Idle State */}
            {!isProcessing && !result && !error && (
              <div className="text-center space-y-4 py-8">
                <div className="flex items-center justify-center gap-1.5 h-10">
                  {[20, 40, 60, 40, 20].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} className="w-1.5 bg-[#74e3d2]/40 rounded-full" />
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-slate-300">Ready for video scan</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  We will sample clip frames and inspect temporal feature maps with Video Swin Transformer.
                </p>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="space-y-6 py-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300 truncate max-w-[200px]">{file?.name}</span>
                  <span className="text-[#74e3d2] font-bold">{progress}%</span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#74e3d2] to-[#a99bff]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>

                <ol className="space-y-3 pt-2 text-xs font-mono text-slate-400">
                  <li className={`flex justify-between ${progress >= 10 ? 'text-[#74e3d2]' : ''}`}>
                    <span>01. Sampling video frames</span>
                    <span>16 frames</span>
                  </li>
                  <li className={`flex justify-between ${progress >= 40 ? 'text-[#74e3d2]' : ''}`}>
                    <span>02. 3D Swin transformer tensor</span>
                    <span>temporal map</span>
                  </li>
                  <li className={`flex justify-between ${progress >= 75 ? 'text-[#74e3d2]' : ''}`}>
                    <span>03. Scoring authenticity</span>
                    <span>calibrating</span>
                  </li>
                </ol>
              </div>
            )}

            {/* Result State */}
            {result && !isProcessing && (
              <div className="space-y-6">
                <div className="flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-wider">Analysis Complete</span>
                  <span className="px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-[#74e3d2] font-bold">
                    VIDEO SWIN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                  <ScoreRing score={Math.round(result.fake_probability * 100)} isFake={result.label === 'fake'} />
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">
                      {result.label === 'fake' ? 'Potential Deepfake Signal' : 'Likely Authentic Signal'}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Probability score is {result.label === 'fake' ? 'above' : 'below'} the 50% review threshold.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 uppercase">
                    <span>Sampled Clip Structure</span>
                    <span>16 Frames</span>
                  </div>
                  <div className="h-12 flex gap-1 items-end">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        style={{ height: `${35 + (i % 5) * 15}%` }}
                        className={`flex-1 rounded-t ${result.label === 'fake' ? 'bg-rose-400/70' : 'bg-[#74e3d2]/70'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={downloadReport}
                    className="flex-1 py-3 rounded-xl bg-[#74e3d2] hover:bg-[#85ebd9] text-[#060d17] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download Report
                  </button>
                  <button
                    onClick={reset}
                    className="p-3 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Could not analyze video</h3>
                <p className="text-xs text-rose-300/90 leading-relaxed max-w-sm mx-auto">
                  {error}
                </p>
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
