'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { Shield, Mic, FileText, Share2, Sparkles } from 'lucide-react';

import { MobileNavBar } from '@/components/MobileNavBar';
import { InfoCard } from '@/components/InfoCard';
import { ActionFAB } from '@/components/ActionFAB';
import { ScriptGenerator } from '@/components/ScriptGenerator';
import { RecordButton } from '@/components/RecordButton';
import { ShareButton } from '@/components/ShareButton';
import { FloatingElements } from '@/components/FloatingElements';
import { SAMPLE_RIGHTS_CARDS } from '@/lib/constants';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeSection, setActiveSection] = useState<'home' | 'guides' | 'scripts' | 'record' | 'share'>('home');
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const renderHomeSection = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-accent mr-3" />
          <h1 className="text-3xl font-bold">RightRoute</h1>
        </div>
        <p className="text-lg text-gray-200 mb-6">
          Your Pocket Guide to Knowing Your Rights
        </p>
        <p className="text-gray-300 max-w-md mx-auto">
          Get instant, simplified legal information and scripts for law enforcement interactions. 
          Know your rights, stay safe, stay informed.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <InfoCard
          title="Rights Cards"
          content="Quick reference guides for your rights in different situations"
          keyPoints={["State-specific information", "Easy to understand", "Mobile optimized"]}
          variant="highlighted"
          onClick={() => setActiveSection('guides')}
        />
        
        <InfoCard
          title="Interactive Scripts"
          content="AI-generated scripts for what to say and what not to say"
          keyPoints={["Multilingual support", "Scenario-based", "Legally accurate"]}
          variant="bordered"
          onClick={() => setActiveSection('scripts')}
        />
      </div>

      {/* Features Grid */}
      <div className="px-4 space-y-4">
        <h2 className="text-xl font-semibold text-center">Core Features</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <div 
            className="glass-card p-4 rounded-lg cursor-pointer hover:bg-opacity-15 transition-all duration-200"
            onClick={() => setActiveSection('record')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Mic className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold">Quick Record</h3>
                <p className="text-sm text-gray-300">Document interactions safely</p>
              </div>
            </div>
          </div>
          
          <div 
            className="glass-card p-4 rounded-lg cursor-pointer hover:bg-opacity-15 transition-all duration-200"
            onClick={() => setActiveSection('share')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <Share2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Share Cards</h3>
                <p className="text-sm text-gray-300">Share rights info with others</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Connection */}
      <div className="px-4">
        <div className="glass-card p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-4">
            Connect to unlock premium features and secure storage
          </p>
          <Wallet>
            <ConnectWallet>
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>
      </div>
    </div>
  );

  const renderGuidesSection = () => (
    <div className="space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rights Cards</h2>
        <button
          onClick={() => setActiveSection('home')}
          className="text-accent hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {selectedCard ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedCard(null)}
            className="text-accent hover:text-white transition-colors duration-200"
          >
            ← Back to Cards
          </button>
          
          <InfoCard
            title={selectedCard.title}
            content={selectedCard.content}
            keyPoints={selectedCard.keyPoints}
            variant="highlighted"
          >
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <ShareButton
                title={selectedCard.title}
                content={selectedCard.content}
              />
            </div>
          </InfoCard>
        </div>
      ) : (
        <div className="space-y-4">
          {SAMPLE_RIGHTS_CARDS.map((card) => (
            <InfoCard
              key={card.id}
              title={card.title}
              content={card.content}
              keyPoints={card.keyPoints}
              variant="bordered"
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderScriptsSection = () => (
    <div className="px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Interactive Scripts</h2>
        <button
          onClick={() => setActiveSection('home')}
          className="text-accent hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>
      <ScriptGenerator />
    </div>
  );

  const renderRecordSection = () => (
    <div className="px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Quick Record</h2>
        <button
          onClick={() => setActiveSection('home')}
          className="text-accent hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>
      <RecordButton />
    </div>
  );

  const renderShareSection = () => (
    <div className="px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Share Rights Info</h2>
        <button
          onClick={() => setActiveSection('home')}
          className="text-accent hover:text-white transition-colors duration-200"
        >
          ← Back
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="glass-card p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-4">Create Shareable Card</h3>
          <p className="text-gray-300 mb-6">
            Generate a digital card with essential rights information to share with your network
          </p>
          
          <div className="space-y-4">
            {SAMPLE_RIGHTS_CARDS.map((card) => (
              <div key={card.id} className="glass-card p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-gray-300 mb-3">{card.content}</p>
                <ShareButton
                  title={card.title}
                  content={card.content}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10">
        <MobileNavBar />
        
        <main className="pb-20">
          {activeSection === 'home' && renderHomeSection()}
          {activeSection === 'guides' && renderGuidesSection()}
          {activeSection === 'scripts' && renderScriptsSection()}
          {activeSection === 'record' && renderRecordSection()}
          {activeSection === 'share' && renderShareSection()}
        </main>

        {/* Floating Action Button */}
        {activeSection === 'home' && (
          <ActionFAB
            variant="primary"
            onClick={() => setActiveSection('scripts')}
          >
            <Sparkles className="h-6 w-6" />
          </ActionFAB>
        )}
      </div>
    </div>
  );
}
