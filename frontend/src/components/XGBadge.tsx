import React from 'react';

interface XGBadgeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const getXGColor = (xg: number) => {
  if (xg >= 2.0) return { color: '#00a651', shadow: '0 0 12px rgba(0,166,81,0.6)', label: 'ALTO' };
  if (xg >= 1.0) return { color: '#f0883e', shadow: '0 0 12px rgba(240,136,62,0.6)', label: 'MÉDIO' };
  if (xg >= 0.5) return { color: '#ffd700', shadow: '0 0 12px rgba(255,215,0,0.4)', label: 'BAIXO' };
  return { color: '#8b949e', shadow: 'none', label: 'MÍNIMO' };
};

export const XGBadge: React.FC<XGBadgeProps> = ({ value, size = 'md', label }) => {
  const { color, shadow } = getXGColor(value);

  const sizeClasses = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-base px-3 py-1',
    lg: 'text-2xl px-4 py-2'
  };

  return (
    <div className="flex flex-col items-center">
      {label && <span className="text-xs text-gray-500 mb-0.5">{label}</span>}
      <div
        className={`font-black rounded-lg ${sizeClasses[size]} font-mono`}
        style={{
          color,
          textShadow: shadow,
          background: `${color}15`,
          border: `1px solid ${color}40`,
        }}
      >
        {value.toFixed(2)}
      </div>
    </div>
  );
};

interface XGCompareProps {
  xgHome: number;
  xgAway: number;
  homeName: string;
  awayName: string;
}

export const XGCompare: React.FC<XGCompareProps> = ({ xgHome, xgAway, homeName, awayName }) => {
  const total = xgHome + xgAway;
  const homePct = total > 0 ? (xgHome / total) * 100 : 50;

  const homeColor = getXGColor(xgHome);
  const awayColor = getXGColor(xgAway);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1 truncate max-w-[80px]">{homeName}</div>
          <div
            className="text-xl font-black font-mono"
            style={{ color: homeColor.color, textShadow: homeColor.shadow }}
          >
            {xgHome.toFixed(2)}
          </div>
        </div>

        <div className="flex-1 mx-3">
          <div className="text-center text-xs text-gray-500 mb-1">xG</div>
          <div className="flex h-2 rounded-full overflow-hidden">
            <div
              className="prob-bar"
              style={{
                width: `${homePct}%`,
                background: `linear-gradient(90deg, ${homeColor.color}, ${homeColor.color}aa)`,
                transition: 'width 0.8s ease-in-out'
              }}
            />
            <div
              className="prob-bar"
              style={{
                width: `${100 - homePct}%`,
                background: `linear-gradient(90deg, ${awayColor.color}aa, ${awayColor.color})`,
                transition: 'width 0.8s ease-in-out'
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1 truncate max-w-[80px] text-right">{awayName}</div>
          <div
            className="text-xl font-black font-mono"
            style={{ color: awayColor.color, textShadow: awayColor.shadow }}
          >
            {xgAway.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
