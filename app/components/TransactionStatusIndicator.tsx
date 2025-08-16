
"use client"

interface TransactionStatusIndicatorProps {
  status: 'pending' | 'success' | 'error'
  txHash?: string
  className?: string
}

export function TransactionStatusIndicator({ 
  status, 
  txHash, 
  className = "" 
}: TransactionStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: "⏳",
          text: "Transaction Pending",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200"
        }
      case 'success':
        return {
          icon: "✅",
          text: "Tip Sent Successfully!",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
          borderColor: "border-green-200"
        }
      case 'error':
        return {
          icon: "❌",
          text: "Transaction Failed",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-200"
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`p-4 rounded-md border ${config.bgColor} ${config.borderColor} animate-slide-up ${className}`}>
      <div className="flex items-center space-x-3">
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1">
          <p className={`font-medium ${config.textColor}`}>
            {config.text}
          </p>
          {txHash && (
            <p className="text-sm text-text-secondary mt-1">
              <span className="font-mono break-all">
                {txHash.slice(0, 6)}...{txHash.slice(-4)}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
