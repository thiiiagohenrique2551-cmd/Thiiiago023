import React from 'react';

interface ProbabilityBarProps {
  home: number;
  draw: number;
  away: number;
  homeName: string;
  awayName: string;
}

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({ home, draw, away, homeName, awayName }) => {
  return (
    <div className="w-full">
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span className="truncate max-w-[35%]">{homeName}</span>
        <span>Empate</span>
        <span className="truncate max-w-[35%] text-right">{awayName}</span>
      </div>

      {/* Barra de probabilidade */}
      <div className="flex h-6 rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-center text-xs font-bold text-white prob-bar"
          style={{
            width: `${home}%`,
            background: 'linear-gradient(90deg, #00a651, #00c853)',
            minWidth: home > 5 ? '40px' : '0',
            transition: 'width 1s ease-in-out'
          }}
        >
          {home > 8 && `${home}%`}
        </div>
        <div
          className="flex items-center justify-center text-xs font-bold text-white prob-bar"
          style={{
            width: `${draw}%`,
            background: 'linear-gradient(90deg, #6e7681, #8b949e)',
            minWidth: draw > 5 ? '40px' : '0',
            transition: 'width 1s ease-in-out'
          }}
        >
          {draw > 8 && `${draw}%`}
        </div>
        <div
          className="flex items-center justify-center text-xs font-bold text-white prob-bar"
          style={{
            width: `${away}%`,
            background: 'linear-gradient(90deg, #58a6ff, #7b2fbe)',
            minWidth: away > 5 ? '40px' : '0',
            transition: 'width 1s ease-in-out'
          }}
        >
          {away > 8 && `${away}%`}
        </div>
      </div>

      {/* Valores */}
      <div className="flex justify-between text-xs font-bold mt-1">
        <span style={{ color: '#00a651' }}>{home}%</span>
        <span className="text-gray-400">{draw}%</span>
        <span style={{ color: '#58a6ff' }}>{away}%</span>
      </div>
    </div>
  );
};
