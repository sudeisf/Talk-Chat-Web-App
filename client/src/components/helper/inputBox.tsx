'use client';

import { useEffect, useRef, useState } from 'react';
import { Smile, Paperclip, Mic, Send, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { ReactMediaRecorder } from 'react-media-recorder';

export function MessageInput() {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Audio visualization state
  const [volume, setVolume] = useState(0); // 0..1
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const stopVisualization = () => {
    if (animationIdRef.current != null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    dataArrayRef.current = null;
    sourceRef.current = null;
    setVolume(0);
  };

  const startVisualization = (stream: MediaStream) => {
    // No audio tracks → nothing to visualize
    if (!stream || stream.getAudioTracks().length === 0) {
      return;
    }

    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    audioContextRef.current = audioCtx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    sourceRef.current = source;

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      // Calculate rough volume as deviation from center (128)
      let sum = 0;
      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] - 128;
        sum += Math.abs(v);
      }
      const avg = sum / dataArrayRef.current.length;
      const normalized = Math.min(avg / 64, 1); // scale to 0..1
      setVolume(normalized);

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  useEffect(() => {
    return () => {
      stopVisualization();
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log('Selected file:', file);
  };

  const handleSendText = () => {
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
  };

  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-full max-w-full mx-auto p-4">
      <div className="relative flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3 border border-border">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something to send"
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />

        <div className="flex items-center gap-2">
          {/* Emoji hover area */}
          <div
            className="relative"
            onMouseEnter={() => setShowEmojiPicker(true)}
            onMouseLeave={() => setShowEmojiPicker(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>

            {showEmojiPicker && (
              <div className="absolute bottom-10 right-0 z-50">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setMessage((prev) => prev + emoji.emoji);
                  }}
                />
              </div>
            )}
          </div>

          {/* File attach */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>

          {/* Text send OR voice record with visualization */}
          {message.trim() ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={handleSendText}
            >
              <Send className="h-5 w-5 text-primary" />
            </Button>
          ) : (
            <ReactMediaRecorder
              audio
              onStop={(blobUrl, blob) => {
                console.log('Voice note URL:', blobUrl, 'Blob:', blob);
                // TODO: upload/send voice message here
              }}
              render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => {
                useEffect(() => {
                  if (status === 'recording') {
                    // start timer
                    timerRef.current = setInterval(() => {
                      setRecordingTime((t) => t + 1);
                    }, 1000);
                  } else {
                    // stop timer
                    setRecordingTime(0);
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                  }

                  return () => {
                    if (timerRef.current) {
                      clearInterval(timerRef.current);
                      timerRef.current = null;
                    }
                  };
                }, [status]);

                const stream = previewStream as MediaStream | null;

                return status === 'recording' && stream ? (
                  // Telegram-style recording UI
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-muted"
                      onClick={stopRecording}
                    >
                      <Square className="h-5 w-5 text-red-500" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <WaveformVisualizer stream={stream} />
                      <span className="text-sm font-medium text-muted-foreground">
                        {formatRecordingTime(recordingTime)}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Idle mic button
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                    onClick={startRecording}
                  >
                    <Mic className="h-5 w-5 text-muted-foreground" />
                  </Button>
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WaveformVisualizer({ stream }: { stream: MediaStream }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!stream || !canvasRef.current || stream.getAudioTracks().length === 0) {
      return;
    }

    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaStreamSource(stream);

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    audioContextRef.current = audioCtx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawWaveform = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      animationIdRef.current = requestAnimationFrame(drawWaveform);

      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

      ctx.fillStyle = 'rgb(248, 250, 252)'; // light background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#3b82f6'; // blue-500
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArrayRef.current[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    drawWaveform();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={32}
      className="rounded-sm"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
