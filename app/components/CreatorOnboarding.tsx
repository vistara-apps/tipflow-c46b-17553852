
"use client"

import { useState } from "react"
import { Creator } from "../types"

interface CreatorOnboardingProps {
  onComplete: (creator: Creator) => void
  className?: string
}

export function CreatorOnboarding({ onComplete, className = "" }: CreatorOnboardingProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    farcasterId: "",
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      setStep(2)
      // In real implementation, this would come from the connected wallet
      setFormData(prev => ({
        ...prev,
        farcasterId: `user${Math.floor(Math.random() * 1000)}`
      }))
    }, 1500)
  }

  const handleSubmit = () => {
    if (formData.displayName) {
      const creator: Creator = {
        ...formData,
        walletAddress: `0x${Math.random().toString(16).substr(2, 40)}`, // Mock address
        createdAt: new Date().toISOString(),
      }
      onComplete(creator)
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {step === 1 && (
        <div className="text-center space-y-6 animate-fade-in">
          <div>
            <h2 className="text-display mb-2">Welcome to TipFlow</h2>
            <p className="text-body text-text-secondary">
              Connect your wallet to start receiving tips from your audience
            </p>
          </div>
          
          <div className="p-6 bg-surface rounded-lg border border-primary">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👛</span>
            </div>
            <h3 className="font-semibold mb-2">Connect Your Base Wallet</h3>
            <p className="text-sm text-text-secondary mb-4">
              We'll use your wallet address to receive tips securely on Base
            </p>
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="btn-primary w-full"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-slide-up">
          <div className="text-center">
            <h2 className="text-display mb-2">Complete Your Profile</h2>
            <p className="text-body text-text-secondary">
              Help your fans find and support you
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Display Name *
              </label>
              <input
                type="text"
                placeholder="Your creator name"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bio (Optional)
              </label>
              <textarea
                placeholder="Tell your audience about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="input-field w-full resize-none"
                rows={3}
              />
            </div>

            <div className="p-3 bg-primary/50 rounded-md">
              <p className="text-sm font-medium text-text-secondary">Farcaster ID</p>
              <p className="text-sm font-mono text-text-primary">@{formData.farcasterId}</p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!formData.displayName}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Setup
          </button>
        </div>
      )}
    </div>
  )
}
