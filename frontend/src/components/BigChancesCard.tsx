import React from 'react';
import { Zap } from 'lucide-react';

interface BigChancesCardProps {
  homeChances: number;
  awayChances: number;
  homeProb: number;
  awayProb: number;
  homeName: string;
  awayName: string;
}

export const BigChancesCard: React.FC<BigChancesCardProps> = ({
  homeChances,
  awayChances,
  homeProb,
  awayProb,
  homeName,
  awayName,
}) => {
  const maxChances = Math.max(homeChances, awayChances, 1);
  const homePercent = (homeChances / maxChances) * 100;
  const awayPercent = (awayChances / maxChances) * 100;

  return (
    <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-lg p-4 border border-orange-500/30">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-orange-400" size={20} />
        <h3 className="text-white font-bold text-lg">Chances Perigosas (Big Chances)</h3>
      </div>

      <div className="space-y-4">
        {/* Home Team */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{homeName}</span>
              <span className="text-2xl font-black text-orange-400">{homeChances}</span>
            </div>
            <span className="text-orange-400 font-bold">{homeProb}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${homePercent}%` }}
            />
          </div>
        </div>

        {/* Away Team */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{awayName}</span>
              <span className="text-2xl font-black text-orange-400">{awayChances}</span>
            </div>
            <span className="text-orange-400 font-bold">{awayProb}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${awayPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-black/30 rounded border border-orange-500/20">
        <p className="text-xs text-gray-300">
          <span className="text-orange-400 font-semibold">Big Chances:</span> Oportunidades claras de gol dentro da área com boa posição de finalização
        </p>
      </div>
    </div>
  );
};
