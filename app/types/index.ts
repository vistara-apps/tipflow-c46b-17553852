
export interface Creator {
  farcasterId: string
  displayName: string
  bio: string
  walletAddress: string
  createdAt: string
}

export interface Transaction {
  transactionHash: string
  senderAddress: string
  recipientAddress: string
  amount: string
  tokenType: string
  timestamp: string
  status: 'pending' | 'success' | 'error'
}

export interface TipAmount {
  value: string
  label: string
  usd: string
}
