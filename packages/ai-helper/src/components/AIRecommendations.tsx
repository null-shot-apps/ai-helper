'use client';

import { useState } from 'react';

interface Recommendation {
  id: string;
  protocol: string;
  apy: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasoning: string;
  icon: string;
}

export default function AIRecommendations() {
  const [recommendations] = useState<Recommendation[]>([
    {
      id: '1',
      protocol: 'Lido',
      apy: 4.5,
      riskLevel: 'Low',
      reasoning: 'Stable yields with high liquidity and proven track record',
      icon: '🔷'
    },
    {
      id: '2',
      protocol: 'Aave',
      apy: 6.8,
      riskLevel: 'Low',
      reasoning: 'Leading lending protocol with strong security and insurance',
      icon: '👻'
    },
    {
      id: '3',
      protocol: 'Curve',
      apy: 12.3,
      riskLevel: 'Medium',
      reasoning: 'High yields on stablecoin pools with moderate IL risk',
      icon: '🌊'
    },
    {
      id: '4',
      protocol: 'Yearn',
      apy: 18.5,
      riskLevel: 'High',
      reasoning: 'Automated yield farming with higher returns and complexity',
      icon: '🔮'
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'High':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleStake = (protocol: string) => {
    console.log(`Staking on ${protocol}`);
    alert(`Staking on ${protocol} - Feature coming soon!`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
        <div className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
          <span className="text-purple-300 text-sm font-medium">🤖 AI Powered</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{rec.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg">{rec.protocol}</h3>
                  <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium border ${getRiskColor(rec.riskLevel)} mt-1`}>
                    {rec.riskLevel} Risk
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-400">{rec.apy}%</p>
                <p className="text-slate-400 text-xs">APY</p>
              </div>
            </div>

            {/* Reasoning */}
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              {rec.reasoning}
            </p>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleStake(rec.protocol)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
              >
                Stake
              </button>
              <button
                onClick={() => console.log(`Learn more about ${rec.protocol}`)}
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

