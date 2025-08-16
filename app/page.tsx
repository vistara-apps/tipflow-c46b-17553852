"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { FrameContainer } from "./components/FrameContainer";
import { ProfileCard } from "./components/ProfileCard";
import { TipButton } from "./components/TipButton";
import { TransactionStatusIndicator } from "./components/TransactionStatusIndicator";
import { TipAmountSelector, type TipAmount } from "./components/TipAmountSelector";

interface Creator {
  farcasterId: string;
  displayName: string;
  bio: string;
  walletAddress: string;
  createdAt: string;
}

interface Transaction {
  transactionHash: string;
  senderAddress: string;
  recipientAddress: string;
  amount: number;
  tokenType: string;
  timestamp: string;
  status: "pending" | "success" | "error";
}

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeView, setActiveView] = useState<"home" | "profile" | "tip">("home");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<TipAmount | undefined>(undefined);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  // Mock creators data
  const mockCreators: Creator[] = [
    {
      farcasterId: "1",
      displayName: "Alice Creator",
      bio: "Digital artist creating beautiful NFTs",
      walletAddress: "0x1234567890123456789012345678901234567890",
      createdAt: "2024-01-01T00:00:00Z"
    },
    {
      farcasterId: "2", 
      displayName: "Bob Builder",
      bio: "Building the future of web3",
      walletAddress: "0x0987654321098765432109876543210987654321",
      createdAt: "2024-01-02T00:00:00Z"
    }
  ];

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const handleCreatorSelect = (creator: Creator) => {
    setSelectedCreator(creator);
    setActiveView("profile");
  };

  const handleTipClick = () => {
    setActiveView("tip");
    setSelectedAmount(undefined);
    setTransaction(null);
  };

  const handleAmountSelect = (amount: TipAmount) => {
    setSelectedAmount(amount);
  };

  const handleSendTip = async () => {
    if (!selectedCreator || !selectedAmount) return;

    // Mock transaction creation
    const mockTransaction: Transaction = {
      transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
      senderAddress: "0x1111111111111111111111111111111111111111",
      recipientAddress: selectedCreator.walletAddress,
      amount: selectedAmount.value,
      tokenType: selectedAmount.token,
      timestamp: new Date().toISOString(),
      status: "pending"
    };

    setTransaction(mockTransaction);

    // Simulate transaction processing
    setTimeout(() => {
      setTransaction(prev => prev ? { ...prev, status: "success" } : null);
    }, 3000);
  };

  const handleBackToHome = () => {
    setActiveView("home");
    setSelectedCreator(null);
    setSelectedAmount(undefined);
    setTransaction(null);
  };

  const handleBackToProfile = () => {
    setActiveView("profile");
    setSelectedAmount(undefined);
    setTransaction(null);
  };

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-accent text-sm font-medium px-3 py-1 rounded-md hover:bg-accent/10 transition-colors"
        >
          + Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-accent">
          <span>✓</span>
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  const renderContent = () => {
    switch (activeView) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-xl font-semibold text-text-primary">TipFlow</h1>
              <p className="text-text-secondary">Directly tip creators, instantly.</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-text-primary">Featured Creators</h2>
              {mockCreators.map((creator) => (
                <ProfileCard
                  key={creator.farcasterId}
                  creator={creator}
                  onSelect={() => handleCreatorSelect(creator)}
                />
              ))}
            </div>
          </div>
        );

      case "profile":
        if (!selectedCreator) return null;
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToHome}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <ProfileCard creator={selectedCreator} />
            
            <div className="space-y-4">
              <TipButton
                variant="primary"
                onClick={handleTipClick}
                disabled={!isConnected}
              >
                {isConnected ? "Send Tip" : "Connect Wallet to Tip"}
              </TipButton>
              
              {!isConnected && (
                <p className="text-sm text-text-secondary text-center">
                  Connect your wallet to start tipping creators
                </p>
              )}
            </div>
          </div>
        );

      case "tip":
        if (!selectedCreator) return null;
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToProfile}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-medium text-text-primary">
                Tip {selectedCreator.displayName}
              </h2>
              <p className="text-text-secondary">Choose an amount to send</p>
            </div>

            {transaction ? (
              <div className="space-y-4">
                <TransactionStatusIndicator
                  status={transaction.status}
                  transactionHash={transaction.transactionHash}
                />
                
                {transaction.status === "success" && (
                  <div className="text-center space-y-4">
                    <p className="text-text-primary">
                      Successfully sent ${transaction.amount} {transaction.tokenType} to {selectedCreator.displayName}!
                    </p>
                    <TipButton
                      variant="primary"
                      onClick={handleBackToHome}
                    >
                      Back to Home
                    </TipButton>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <TipAmountSelector
                  onAmountSelect={handleAmountSelect}
                  selectedAmount={selectedAmount}
                />
                {selectedAmount && (
                  <div className="mt-4 text-center">
                    <TipButton
                      variant="primary"
                      onClick={handleSendTip}
                      disabled={!isConnected}
                    >
                      Send ${selectedAmount.value} {selectedAmount.token}
                    </TipButton>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <FrameContainer>
      <div className="w-full max-w-lg mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11">
          <div>
            <Wallet className="z-10">
              <ConnectWallet
                onConnect={() => setIsConnected(true)}
                onDisconnect={() => setIsConnected(false)}
              >
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
          <div>{saveFrameButton}</div>
        </header>

        <main className="flex-1">
          {renderContent()}
        </main>

        <footer className="mt-8 pt-4 flex justify-center">
          <button
            className="text-text-secondary text-xs hover:text-accent transition-colors"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </FrameContainer>
  );
}
