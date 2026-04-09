import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OverUnderData {
  over_1_5: number;
  under_1_5: number;
  over_2_5: number;
  under_2_5: number;
  over_3_5: number;
  under_3_5: number;
  expected_total_goals: number;
  expected_remaining_goals: number;
}

interface OverUnderCardProps {
  data: OverUnderData;
  currentGoals: number;
}

const getOddsColor = (probability: number) => {
  if (probability >= 70) return { bg: '#00a65120', text: '#00a651', border: '#00a651' };
  if (probability >= 50) return { bg: '#f0883e20', text: '#f0883e', border: '#f0883e' };
  if (probability >= 30) return { text: '#ffd70080', bg: '#ffd70010', border: '#ffd70040' };
  return { bg: '#8b949e10', text: '#8b949e', border: '#8b949e40' };
};

const OverUnderRow: React.FC<{
  label: string;
  overProb: number;
  underProb: number;
}> = ({ label, overProb, underProb }) => {
  const overColor = getOddsColor(overProb);
  const underColor = getOddsColor(underProb);

  return (
    <div className="mb-3">
      <div className="text-xs font-bold text-gray-400 mb-1.5">{label}</div>
      <div className="grid grid-cols-2 gap-2">
        {/* Over */}
        <div
          className="rounded-lg p-2 text-center border"
          style={{
            background: overColor.bg,
            borderColor: overColor.border,
          }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={12} style={{ color: overColor.text }} />
            <span className="text-xs text-gray-400">Over</span>
          </div>
          <div className="text-lg font-black" style={{ color: overColor.text }}>
            {overProb}%
          </div>
        </div>

        {/* Under */}
        <div
          className="rounded-lg p-2 text-center border"
          style={{
            background: underColor.bg,
            borderColor: underColor.border,
          }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingDown size={12} style={{ color: underColor.text }} />
            <span className="text-xs text-gray-400">Under</span>
          </div>
          <div className="text-lg font-black" style={{ color: underColor.text }}>
            {underProb}%
          </div>
        </div>
      </div>
    </div>
  );
};

export const OverUnderCard: React.FC<OverUnderCardProps> = ({ data, currentGoals }) => {
  return (
    <div className="rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp size={14} className="text-green-400" />
        Probabilidade Over/Under
      </h3>

      {/* Informações gerais */}
      <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg" style={{ background: '#161b22' }}>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Gols Atuais</div>
          <div className="text-2xl font-black text-white">{currentGoals}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Esperados</div>
          <div className="text-2xl font-black text-green-400">{data.expected_total_goals}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Restantes</div>
          <div className="text-2xl font-black text-orange-400">{data.expected_remaining_goals}</div>
        </div>
      </div>

      {/* Over/Under rows */}
      <OverUnderRow label="Over/Under 1.5" overProb={data.over_1_5} underProb={data.under_1_5} />
      <OverUnderRow label="Over/Under 2.5" overProb={data.over_2_5} underProb={data.under_2_5} />
      <OverUnderRow label="Over/Under 3.5" overProb={data.over_3_5} underProb={data.under_3_5} />

      {/* Guia de interpretação */}
      <div className="mt-4 p-3 rounded-lg text-xs text-gray-500" style={{ background: '#161b22' }}>
        <p className="font-semibold text-gray-400 mb-2">Como interpretar:</p>
        <ul className="space-y-1">
          <li>• <span className="text-green-400">Over 1.5</span>: Probabilidade de 2 ou mais gols no total</li>
          <li>• <span className="text-green-400">Over 2.5</span>: Probabilidade de 3 ou mais gols no total</li>
          <li>• <span className="text-green-400">Over 3.5</span>: Probabilidade de 4 ou mais gols no total</li>
          <li>• <span className="text-blue-400">Under</span>: Probabilidade do oposto (menos gols)</li>
        </ul>
      </div>
    </div>
  );
};

export const OverUnderCompact: React.FC<OverUnderCardProps> = ({ data }) => {
  return (
    <div className="rounded-lg p-3" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
      <div className="grid grid-cols-3 gap-2">
        {/* Over 1.5 */}
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Over 1.5</div>
          <div className="text-sm font-black text-green-400">{data.over_1_5}%</div>
          <div className="text-xs text-gray-500">Under {data.under_1_5}%</div>
        </div>

        {/* Over 2.5 */}
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Over 2.5</div>
          <div className="text-sm font-black text-green-400">{data.over_2_5}%</div>
          <div className="text-xs text-gray-500">Under {data.under_2_5}%</div>
        </div>

        {/* Over 3.5 */}
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Over 3.5</div>
          <div className="text-sm font-black text-green-400">{data.over_3_5}%</div>
          <div className="text-xs text-gray-500">Under {data.under_3_5}%</div>
        </div>
      </div>
    </div>
  );
};
