
"use client"

import { ReactNode } from "react"

interface FrameContainerProps {
  children: ReactNode
  className?: string
}

export function FrameContainer({ children, className = "" }: FrameContainerProps) {
  return (
    <div className={`frame-container animate-fade-in ${className}`}>
      {children}
    </div>
  )
}
