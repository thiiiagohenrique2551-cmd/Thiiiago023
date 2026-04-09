import { useState } from 'react';
import type { Match } from '../types';
import { ProbabilityBar } from './ProbabilityBar';
import { XGCompare } from './XGBadge';
import { OverUnderCard } from './OverUnderCard';
import { X, Target, Flag, TrendingUp, Activity, RefreshCw } from 'lucide-react';
import { useMatchDetail } from '../hooks/useLiveMatches';

interface MatchDetailProps {
  match: Match;
  onClose: () => void;
}

type TabType = 'overview' | 'stats' | 'xg' | 'corners' | 'over_under';

export const MatchDetail: React.FC<MatchDetailProps> = ({ match: initialMatch, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { match: liveMatch, loading, refresh } = useMatchDetail(initialMatch.fixture_id);

  const match = liveMatch || initialMatch;

  const getStatusLabel = (status: string, minute: number) => {
    if (status === '1H') return `1º Tempo - ${minute}'`;
    if (status === '2H') return `2º Tempo - ${minute}'`;
    if (status === 'HT') return 'Intervalo';
    if (status === 'ET') return `Prorrogação - ${minute}'`;
    if (status === 'P') return 'Pênaltis';
    return status;
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Visão Geral', icon: Activity },
    { id: 'stats' as TabType, label: 'Estatísticas', icon: TrendingUp },
    { id: 'xg' as TabType, label: 'xG Análise', icon: Target },
    { id: 'corners' as TabType, label: 'Escanteios', icon: Flag },
    { id: 'over_under' as TabType, label: 'Over/Under', icon: TrendingUp },
  ];


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 px-4 pb-4 modal-overlay" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#161b22', border: '1px solid #30363d', maxHeight: '95vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10" style={{ background: '#161b22', borderBottom: '1px solid #30363d' }}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              {match.league.logo && (
                <img src={match.league.logo} alt={match.league.name} className="w-5 h-5 object-contain" />
              )}
              <div>
                <div className="text-sm font-semibold text-white">{match.league.name}</div>
                <div className="text-xs text-gray-400">{match.league.country}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ background: '#0d1117' }}
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ background: '#0d1117' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Placar Principal */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-2 flex-1">
                {match.teams.home.logo && (
                  <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-12 h-12 object-contain" />
                )}
                <span className="text-sm font-bold text-white text-center">{match.teams.home.name}</span>
              </div>

              <div className="flex flex-col items-center mx-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-white">{match.score.home}</span>
                  <span className="text-2xl text-gray-500">-</span>
                  <span className="text-4xl font-black text-white">{match.score.away}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="live-dot w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-green-400">
                    {getStatusLabel(match.status, match.minute)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 flex-1">
                {match.teams.away.logo && (
                  <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-12 h-12 object-contain" />
                )}
                <span className="text-sm font-bold text-white text-center">{match.teams.away.name}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-t overflow-x-auto" style={{ borderColor: '#30363d' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors whitespace-nowrap px-2"
                  style={{
                    color: activeTab === tab.id ? '#00a651' : '#8b949e',
                    borderBottom: activeTab === tab.id ? '2px solid #00a651' : '2px solid transparent',
                    background: 'transparent'
                  }}
                >
                  <Icon size={12} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="p-4">
          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Activity size={14} className="text-green-400" />
                  Probabilidade de Vitória em Tempo Real
                </h3>
                <ProbabilityBar
                  home={match.win_probability.home}
                  draw={match.win_probability.draw}
                  away={match.win_probability.away}
                  homeName={match.teams.home.name}
                  awayName={match.teams.away.name}
                />
              </div>

              <div className="rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Target size={14} className="text-green-400" />
                  Expected Goals (xG)
                </h3>
                <XGCompare
                  xgHome={match.xg.home}
                  xgAway={match.xg.away}
                  homeName={match.teams.home.name}
                  awayName={match.teams.away.name}
                />
                <div className="text-center mt-2">
                  <span className="text-xs text-gray-500">xG Total: </span>
                  <span className="text-sm font-bold text-white">{match.xg.total}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 text-center" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                  <div className="text-xs text-gray-400 mb-2">Prob. Gol</div>
                  <div className="text-2xl font-black text-green-400">{match.goal_probability}%</div>
                </div>

                <div className="rounded-xl p-3 text-center" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
                  <div className="text-xs text-gray-400 mb-2">Prob. Escanteio</div>
                  <div className="text-2xl font-black text-yellow-400">{match.corner_probability}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Over/Under */}
          {activeTab === 'over_under' && (
            <div className="space-y-4">
              <OverUnderCard data={match.over_under} currentGoals={match.score.home + match.score.away} />
            </div>
          )}

          {/* Stats, xG, Corners - Placeholder */}
          {(activeTab === 'stats' || activeTab === 'xg' || activeTab === 'corners') && (
            <div className="text-center text-gray-400 py-8">
              <p>Seção de {activeTab === 'stats' ? 'Estatísticas' : activeTab === 'xg' ? 'xG' : 'Escanteios'} disponível</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
