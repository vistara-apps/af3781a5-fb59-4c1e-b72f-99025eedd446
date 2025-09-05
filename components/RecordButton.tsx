'use client';

import { AlertCircle, Download, Mic, Pause, Play, Save, Square, Trash2 } from 'lucide-react';
import { useRecording } from '@/lib/hooks/useRecording';
import { useState } from 'react';

interface RecordButtonProps {
  variant?: 'active' | 'inactive';
}

export function RecordButton({ variant = 'inactive' }: RecordButtonProps) {
  const {
    isRecording,
    isPaused,
    audioUrl,
    error,
    formattedDuration,
    formattedFileSize,
    isSupported,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
    downloadRecording,
    saveRecording
  } = useRecording();

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveRecording = async () => {
    setSaving(true);
    setSaveSuccess(false);
    
    try {
      // In a real app, you'd get the actual user ID
      const userId = 'demo-user-' + Date.now();
      await saveRecording(userId);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save recording:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="glass-card p-6 rounded-lg text-center">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Recording Not Supported</h3>
        <p className="text-gray-300">
          Your browser doesn't support audio recording. Please use a modern browser like Chrome, Firefox, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="glass-card p-4 rounded-lg border-red-500 border-opacity-50">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <div className="glass-card p-4 rounded-lg border-green-500 border-opacity-50">
          <div className="flex items-center space-x-2 text-green-400">
            <Save className="h-5 w-5" />
            <span className="text-sm">Recording saved successfully!</span>
          </div>
        </div>
      )}

      {/* Recording Controls */}
      <div className="glass-card p-6 rounded-lg text-center">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Quick Record</h3>
          <p className="text-gray-300 text-sm mb-4">
            Tap to start recording your interaction for documentation
          </p>
          
          <div className="text-4xl font-mono text-white mb-2">
            {formattedDuration}
          </div>
          <div className="text-sm text-gray-300 space-y-1">
            <div>
              {isRecording ? (isPaused ? 'Paused' : 'Recording...') : 'Ready to record'}
            </div>
            {formattedFileSize && (
              <div className="text-xs text-gray-400">
                File size: {formattedFileSize}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {!isRecording && !audioUrl && (
            <button
              onClick={startRecording}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Mic className="h-8 w-8 text-white" />
            </button>
          )}

          {isRecording && (
            <>
              <button
                onClick={isPaused ? resumeRecording : pauseRecording}
                className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {isPaused ? <Play className="h-6 w-6 text-white" /> : <Pause className="h-6 w-6 text-white" />}
              </button>
              
              <button
                onClick={stopRecording}
                className="w-16 h-16 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Square className="h-8 w-8 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Playback and Actions */}
        {audioUrl && (
          <div className="space-y-4">
            <div className="bg-black bg-opacity-20 rounded-lg p-4">
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/webm" />
                Your browser does not support audio playback.
              </audio>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={downloadRecording}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              
              <button
                onClick={handleSaveRecording}
                disabled={saving}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
              
              <button
                onClick={clearRecording}
                className="btn-secondary flex items-center space-x-2 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear</span>
              </button>
              
              <button
                onClick={startRecording}
                className="btn-secondary flex items-center space-x-2"
              >
                <Mic className="h-4 w-4" />
                <span>Record Again</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
          Recording Guidelines
        </h3>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Hold your device steady and speak clearly</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Record from a safe distance during interactions</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Know your local laws about recording police</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Keep recordings secure and share responsibly</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2">•</span>
            <span>Inform others you are recording when legally required</span>
          </li>
        </ul>
      </div>

      {/* Legal Notice */}
      <div className="glass-card p-4 rounded-lg border-yellow-500 border-opacity-30">
        <div className="text-xs text-gray-400 text-center">
          <strong className="text-yellow-400">Legal Notice:</strong> Recording laws vary by location. 
          Some states require consent from all parties. Research your local laws before recording.
        </div>
      </div>
    </div>
  );
}
