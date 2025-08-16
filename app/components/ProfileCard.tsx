
"use client"

import { Creator } from "../types"

interface ProfileCardProps {
  creator: Creator
  className?: string
}

export function ProfileCard({ creator, className = "" }: ProfileCardProps) {
  return (
    <div className={`card animate-slide-up ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
          <span className="text-lg font-semibold text-accent">
            {creator.displayName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-display text-text-primary mb-1">
            {creator.displayName}
          </h3>
          <p className="text-secondary mb-2">
            @{creator.farcasterId}
          </p>
          {creator.bio && (
            <p className="text-body text-text-secondary">
              {creator.bio}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 p-3 bg-primary/50 rounded-md">
        <p className="text-secondary text-text-secondary">
          Wallet Address
        </p>
        <p className="text-sm font-mono text-text-primary break-all">
          {creator.walletAddress}
        </p>
      </div>
    </div>
  )
}
