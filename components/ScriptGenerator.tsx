'use client';

import { useState } from 'react';
import { ChevronDown, Globe, MapPin, Loader2 } from 'lucide-react';
import { US_STATES, SCENARIOS } from '@/lib/constants';
import { generateScript } from '@/lib/openai';
import { GeneratedScript } from '@/lib/types';

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

  const handleGenerateScript = async () => {
    setIsGenerating(true);
    try {
      const script = await generateScript({
        scenario: selectedScenario,
        state: selectedState,
        language: selectedLanguage
      });
      setGeneratedScript(script);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setIsGenerating(false);
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

      {/* Generated Script Display */}
      {generatedScript && (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-accent">✓ What TO Say</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-red-400">✗ What NOT to Say</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-blue-400">🛡️ Your Key Rights</h3>
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
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">💡 Additional Tips</h3>
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
