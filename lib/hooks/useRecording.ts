import { useState, useRef, useCallback } from 'react';
import { isMediaRecordingSupported, formatFileSize } from '@/lib/utils';

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  audioUrl: string | null;
  error: string | null;
  fileSize: number;
}

export function useRecording() {
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    audioUrl: null,
    error: null,
    fileSize: 0
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(async () => {
    if (!isMediaRecordingSupported()) {
      setState(prev => ({ ...prev, error: 'Recording not supported in this browser' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, error: null }));
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        setState(prev => ({
          ...prev,
          audioUrl: url,
          fileSize: blob.size,
          isRecording: false,
          isPaused: false
        }));

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        setState(prev => ({ 
          ...prev, 
          error: 'Recording failed: ' + (event as any).error?.message || 'Unknown error'
        }));
      };

      mediaRecorder.start(1000); // Collect data every second
      
      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        duration: 0,
        audioUrl: null,
        fileSize: 0
      }));

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);

    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Failed to start recording'
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [state.isRecording]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
      mediaRecorderRef.current.pause();
      setState(prev => ({ ...prev, isPaused: true }));
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [state.isRecording, state.isPaused]);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
      mediaRecorderRef.current.resume();
      setState(prev => ({ ...prev, isPaused: false }));
      
      // Resume duration timer
      intervalRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);
    }
  }, [state.isRecording, state.isPaused]);

  const clearRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl);
    }
    
    setState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      audioUrl: null,
      error: null,
      fileSize: 0
    });
    
    chunksRef.current = [];
  }, [state.audioUrl]);

  const saveRecording = useCallback(async (userId: string) => {
    if (!state.audioUrl) {
      throw new Error('No recording to save');
    }

    try {
      const response = await fetch(state.audioUrl);
      const blob = await response.blob();
      
      // In a real app, you would upload to a storage service
      // For demo purposes, we'll just save metadata
      const recordingData = {
        userId,
        filePath: `recordings/${userId}/${Date.now()}.webm`,
        storageType: 'local' as const
      };

      const saveResponse = await fetch('/api/recordings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordingData),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save recording metadata');
      }

      const result = await saveResponse.json();
      return result.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to save recording');
    }
  }, [state.audioUrl]);

  const downloadRecording = useCallback(() => {
    if (!state.audioUrl) return;

    const a = document.createElement('a');
    a.href = state.audioUrl;
    a.download = `rightroute-recording-${new Date().toISOString().split('T')[0]}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [state.audioUrl]);

  const formatDuration = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    ...state,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
    saveRecording,
    downloadRecording,
    formatDuration,
    formattedDuration: formatDuration(state.duration),
    formattedFileSize: state.fileSize > 0 ? formatFileSize(state.fileSize) : null,
    isSupported: isMediaRecordingSupported()
  };
}
