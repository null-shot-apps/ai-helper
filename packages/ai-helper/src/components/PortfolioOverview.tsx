'use client';

import { useState } from 'react';

interface Asset {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
}

export default function PortfolioOverview() {
  const [assets] = useState<Asset[]>([
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.5,
      price: 2250.00,
      value: 5625.00,
      change24h: 3.2
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: 10000,
      price: 1.00,
      value: 10000.00,
      change24h: 0.01
    },
    {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      balance: 5000,
      price: 1.00,
      value: 5000.00,
      change24h: -0.02
    }
  ]);

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Portfolio Overview</h2>
      
      {/* Total Value */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
        <p className="text-slate-300 text-sm mb-1">Total Portfolio Value</p>
        <p className="text-4xl font-bold text-white">
          ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Assets List */}
      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 border border-white/10"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{asset.symbol}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{asset.name}</p>
                <p className="text-slate-400 text-sm">
                  {asset.balance.toLocaleString()} {asset.symbol}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white font-semibold">
                ${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className={`text-sm ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



