"use client";

import { useState } from "react";

export interface TipAmount {
  value: number;
  label: string;
  token: string;
}

interface TipAmountSelectorProps {
  onAmountSelect: (amount: TipAmount) => void;
  selectedAmount?: TipAmount;
}

const predefinedAmounts: TipAmount[] = [
  { value: 1, label: "$1", token: "USDC" },
  { value: 5, label: "$5", token: "USDC" },
  { value: 10, label: "$10", token: "USDC" },
  { value: 25, label: "$25", token: "USDC" },
];

export function TipAmountSelector({ onAmountSelect, selectedAmount }: TipAmountSelectorProps) {
  const [customAmount, setCustomAmount] = useState("");

  const handlePredefinedSelect = (amount: TipAmount) => {
    onAmountSelect(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onAmountSelect({
        value: numValue,
        label: `$${numValue}`,
        token: "USDC"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {predefinedAmounts.map((amount) => (
          <button
            key={amount.value}
            onClick={() => handlePredefinedSelect(amount)}
            className={`p-3 rounded-lg border-2 transition-all duration-150 ${
              selectedAmount?.value === amount.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-primary hover:border-accent hover:bg-accent/5"
            }`}
          >
            <div className="font-semibold">{amount.label}</div>
            <div className="text-sm text-text-secondary">{amount.token}</div>
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          Custom Amount
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          value={customAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          className="w-full p-3 rounded-lg border border-primary bg-surface focus:border-accent focus:outline-none transition-colors"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}
