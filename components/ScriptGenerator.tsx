'use client';

import { useState } from 'react';
import { ChevronDown, Globe, MapPin, Loader2, AlertCircle, Copy, Check } from 'lucide-react';
import { US_STATES, SCENARIOS } from '@/lib/constants';
import { GeneratedScript } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

interface ScriptGeneratorProps {
  variant?: 'languageSwitch' | 'stateSelect';
}

export function ScriptGenerator({ variant = 'stateSelect' }: ScriptGeneratorProps) {
  const [selectedState, setSelectedState] = useState('California');
  const [selectedScenario, setSelectedScenario] = useState('Traffic Stop');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/scripts/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: selectedScenario,
          state: selectedState,
          language: selectedLanguage
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setGeneratedScript(data.data);
    } catch (error) {
      console.error('Error generating script:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate script');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySection = async (sectionName: string, content: string[]) => {
    const text = content.join('\n');
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="glass-card p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold mb-4">Generate Your Script</h2>
        
        {/* Language Toggle */}
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-accent" />
          <div className="flex bg-white bg-opacity-10 rounded-lg p-1">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedLanguage === 'en' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('es')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedLanguage === 'es' 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Español
            </button>
          </div>
        </div>

        {/* State Selector */}
        <div className="relative">
          <button
            onClick={() => setShowStateDropdown(!showStateDropdown)}
            className="w-full flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-15 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent" />
              <span>{selectedState}</span>
            </div>
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showStateDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showStateDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 bg-opacity-95 backdrop-blur-lg rounded-lg border border-white border-opacity-20 max-h-60 overflow-y-auto z-10">
              {US_STATES.map((state) => (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowStateDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scenario Selector */}
        <div className="relative">
          <button
            onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
            className="w-full flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-15 transition-all duration-200"
          >
            <span>{selectedScenario}</span>
            <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showScenarioDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showScenarioDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 bg-opacity-95 backdrop-blur-lg rounded-lg border border-white border-opacity-20 z-10">
              {SCENARIOS.map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => {
                    setSelectedScenario(scenario);
                    setShowScenarioDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
                >
                  {scenario}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateScript}
          disabled={isGenerating}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <span>Generate Script</span>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="glass-card p-4 rounded-lg border-red-500 border-opacity-50">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Generated Script Display */}
      {generatedScript && (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-accent">✓ What TO Say</h3>
              <button
                onClick={() => handleCopySection('whatToSay', generatedScript.whatToSay)}
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copiedSection === 'whatToSay' ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2">
              {generatedScript.whatToSay.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-400">✗ What NOT to Say</h3>
              <button
                onClick={() => handleCopySection('whatNotToSay', generatedScript.whatNotToSay)}
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copiedSection === 'whatNotToSay' ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2">
              {generatedScript.whatNotToSay.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-400">🛡️ Your Key Rights</h3>
              <button
                onClick={() => handleCopySection('keyRights', generatedScript.keyRights)}
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copiedSection === 'keyRights' ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2">
              {generatedScript.keyRights.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-yellow-400">💡 Additional Tips</h3>
              <button
                onClick={() => handleCopySection('additionalTips', generatedScript.additionalTips)}
                className="flex items-center space-x-1 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                {copiedSection === 'additionalTips' ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <ul className="space-y-2">
              {generatedScript.additionalTips.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
