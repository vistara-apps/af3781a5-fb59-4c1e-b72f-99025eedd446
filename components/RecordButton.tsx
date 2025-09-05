'use client';

import { useState, useRef } from 'react';
import { Mic, MicOff, Square, Play, Pause } from 'lucide-react';

interface RecordButtonProps {
  variant?: 'active' | 'inactive';
}

export function RecordButton({ variant = 'inactive' }: RecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        // Here you would typically save or upload the recording
        console.log('Recording saved:', blob);
        setHasRecording(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        intervalRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold">Quick Record</h3>
        <p className="text-gray-300 text-sm">
          Tap to start recording your interaction for documentation
        </p>

        {/* Recording Status */}
        {isRecording && (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 font-mono">{formatTime(recordingTime)}</span>
            {isPaused && <span className="text-yellow-400 text-sm">(Paused)</span>}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Mic className="h-8 w-8 text-white" />
            </button>
          ) : (
            <>
              <button
                onClick={pauseRecording}
                className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all duration-200"
              >
                {isPaused ? <Play className="h-6 w-6 text-white" /> : <Pause className="h-6 w-6 text-white" />}
              </button>
              
              <button
                onClick={stopRecording}
                className="w-16 h-16 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200"
              >
                <Square className="h-8 w-8 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Recording Status Text */}
        <div className="text-sm text-gray-400">
          {!isRecording && !hasRecording && "Ready to record"}
          {isRecording && !isPaused && "Recording in progress..."}
          {isRecording && isPaused && "Recording paused"}
          {!isRecording && hasRecording && "Recording saved"}
        </div>

        {/* Legal Notice */}
        <div className="text-xs text-gray-500 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
          <p className="mb-1">⚖️ <strong>Legal Notice:</strong></p>
          <p>Recording laws vary by state. In some states, all parties must consent to recording. Use responsibly and know your local laws.</p>
        </div>
      </div>
    </div>
  );
}
