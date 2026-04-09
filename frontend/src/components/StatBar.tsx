import React from 'react';

interface StatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  unit?: string;
  isPercentage?: boolean;
}

export const StatBar: React.FC<StatBarProps> = ({ label, homeValue, awayValue, unit = '', isPercentage = false }) => {
  const total = homeValue + awayValue;
  const homePct = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPct = total > 0 ? (awayValue / total) * 100 : 50;

  const displayHome = isPercentage ? `${homeValue}%` : `${homeValue}${unit}`;
  const displayAway = isPercentage ? `${awayValue}%` : `${awayValue}${unit}`;

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-white">{displayHome}</span>
        <span className="text-xs text-gray-400 text-center flex-1 mx-2">{label}</span>
        <span className="text-sm font-bold text-white">{displayAway}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div
          className="prob-bar rounded-l-full"
          style={{
            width: `${homePct}%`,
            background: 'linear-gradient(90deg, #00a651, #00c853)',
            transition: 'width 0.8s ease-in-out'
          }}
        />
        <div
          className="prob-bar rounded-r-full"
          style={{
            width: `${awayPct}%`,
            background: 'linear-gradient(90deg, #58a6ff, #7b2fbe)',
            transition: 'width 0.8s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};
