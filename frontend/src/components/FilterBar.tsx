import React from 'react';
import { SlidersHorizontal, Target, Flag, TrendingUp, Trophy } from 'lucide-react';

export type SortType = 'ranking' | 'goal_prob' | 'corner_prob' | 'xg_total' | 'minute';

interface FilterBarProps {
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  filterLeague: string;
  onFilterLeague: (league: string) => void;
  leagues: string[];
}

const sortOptions: { value: SortType; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'ranking', label: 'Ranking', icon: Trophy, color: '#ffd700' },
  { value: 'goal_prob', label: 'Prob. Gol', icon: Target, color: '#00a651' },
  { value: 'xg_total', label: 'xG Total', icon: TrendingUp, color: '#f0883e' },
  { value: 'corner_prob', label: 'Escanteios', icon: Flag, color: '#58a6ff' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ sortBy, onSortChange, filterLeague, onFilterLeague, leagues }) => {
  return (
    <div className="px-4 py-3" style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
      {/* Ordenação */}
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal size={12} className="text-gray-400 flex-shrink-0" />
        <span className="text-xs text-gray-400 flex-shrink-0">Ordenar por:</span>
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {sortOptions.map(option => {
            const Icon = option.icon;
            const isActive = sortBy === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: isActive ? `${option.color}20` : '#0d1117',
                  color: isActive ? option.color : '#8b949e',
                  border: `1px solid ${isActive ? option.color : '#30363d'}`,
                }}
              >
                <Icon size={10} />
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro por liga */}
      {leagues.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <span className="text-xs text-gray-400 flex-shrink-0">Liga:</span>
          <button
            onClick={() => onFilterLeague('')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all"
            style={{
              background: filterLeague === '' ? '#00a65120' : '#0d1117',
              color: filterLeague === '' ? '#00a651' : '#8b949e',
              border: `1px solid ${filterLeague === '' ? '#00a651' : '#30363d'}`,
            }}
          >
            Todas
          </button>
          {leagues.slice(0, 8).map(league => (
            <button
              key={league}
              onClick={() => onFilterLeague(league === filterLeague ? '' : league)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all"
              style={{
                background: filterLeague === league ? '#00a65120' : '#0d1117',
                color: filterLeague === league ? '#00a651' : '#8b949e',
                border: `1px solid ${filterLeague === league ? '#00a651' : '#30363d'}`,
              }}
            >
              {league}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
