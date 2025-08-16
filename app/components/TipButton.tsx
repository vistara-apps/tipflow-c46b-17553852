
"use client"

import { useState } from "react"

interface TipButtonProps {
  variant?: 'primary' | 'disabled'
  amount?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function TipButton({ 
  variant = 'primary', 
  amount,
  onClick, 
  disabled = false,
  loading = false,
  className = "" 
}: TipButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const baseClasses = "px-6 py-3 rounded-md font-medium transition-all duration-base ease-smooth transform"
  
  const variantClasses = {
    primary: `btn-primary ${isPressed ? 'scale-95' : 'hover:scale-105'} active:scale-95`,
    disabled: "bg-primary/50 text-text-secondary cursor-not-allowed"
  }

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      setIsPressed(true)
      setTimeout(() => setIsPressed(false), 150)
      onClick()
    }
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[disabled ? 'disabled' : variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : (
        <>
          {amount && <span className="mr-2">💰</span>}
          Tip {amount || '$5'}
        </>
      )}
    </button>
  )
}
