import type { Match } from '../types';
import { ProbabilityBar } from './ProbabilityBar';
import { XGCompare } from './XGBadge';
import { Target, TrendingUp, Flag, Zap, Shield } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  rank: number;
  onClick: () => void;
}

const getRankStyle = (rank: number) => {
  if (rank === 1) return { bg: 'linear-gradient(135deg, #ffd700, #ff8c00)', text: '#000' };
  if (rank === 2) return { bg: 'linear-gradient(135deg, #c0c0c0, #808080)', text: '#000' };
  if (rank === 3) return { bg: 'linear-gradient(135deg, #cd7f32, #8b4513)', text: '#fff' };
  return { bg: '#1c2333', text: '#8b949e' };
};

const getGoalProbColor = (prob: number) => {
  if (prob >= 70) return '#00a651';
  if (prob >= 50) return '#f0883e';
  if (prob >= 30) return '#ffd700';
  return '#8b949e';
};

const getStatusColor = (status: string) => {
  if (['1H', '2H'].includes(status)) return '#00a651';
  if (['HT'].includes(status)) return '#ffd700';
  if (['ET', 'P'].includes(status)) return '#f85149';
  return '#8b949e';
};

const getStatusLabel = (status: string, minute: number) => {
  if (status === '1H') return `${minute}'`;
  if (status === '2H') return `${minute}'`;
  if (status === 'HT') return 'INT';
  if (status === 'ET') return `PE ${minute}'`;
  if (status === 'P') return 'PEN';
  if (status === 'SUSP') return 'SUSP';
  return status;
};

export const MatchCard: React.FC<MatchCardProps> = ({ match, rank, onClick }) => {
  const rankStyle = getRankStyle(rank);
  const goalProbColor = getGoalProbColor(match.goal_probability);
  const statusColor = getStatusColor(match.status);

  const homeAttacks = match.statistics.home.attacks;
  const awayAttacks = match.statistics.away.attacks;
  const homeDangerous = match.statistics.home.dangerous_attacks;
  const awayDangerous = match.statistics.away.dangerous_attacks;
  const homeShotsOn = match.statistics.home.shots_on_goal;
  const awayShotsOn = match.statistics.away.shots_on_goal;

  const homeWinProb = match.win_probability.home;
  const awayWinProb = match.win_probability.away;
  const homeHigherWinProb = homeWinProb > awayWinProb;

  const homeXG = match.xg.home;
  const awayXG = match.xg.away;
  const homeHigherXG = homeXG > awayXG;

  // const homeBigChances = match.big_chances?.home || 0;
  // const awayBigChances = match.big_chances?.away || 0;

  return (
    <div 
      className="match-card slide-in rounded-xl p-4 mb-3 cursor-pointer transition-all hover:shadow-lg" 
      style={{ 
        background: '#161b22',
        border: '1px solid #30363d'
      }} 
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
            style={{ background: rankStyle.bg, color: rankStyle.text }}
          >
            {rank}
          </div>
          <div className="flex items-center gap-1.5">
            {match.league.logo && (
              <img src={match.league.logo} alt={match.league.name} className="w-4 h-4 object-contain" />
            )}
            <span className="text-xs text-gray-400 truncate max-w-[140px]">
              {match.league.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="live-dot w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
            style={{ background: statusColor }}
          />
          <span className="text-xs font-bold" style={{ color: statusColor }}>
            {getStatusLabel(match.status, match.minute)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div 
          className="flex items-center gap-2 flex-1 px-2 py-1.5 rounded-lg transition-all"
          style={{
            background: homeHigherWinProb ? 'rgba(0, 166, 81, 0.15)' : 'transparent',
            border: homeHigherWinProb ? '1px solid rgba(0, 166, 81, 0.3)' : 'none'
          }}
        >
          {match.teams.home.logo && (
            <img src={match.teams.home.logo} alt={match.teams.home.name} className="w-8 h-8 object-contain flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <span className="text-sm font-semibold text-white truncate block">{match.teams.home.name}</span>
            {homeHigherWinProb && (
              <span className="text-xs text-green-400 font-bold">Favorito</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 mx-3 flex-shrink-0">
          <span className="text-2xl font-black text-white">{match.score.home}</span>
          <span className="text-gray-500 text-lg">-</span>
          <span className="text-2xl font-black text-white">{match.score.away}</span>
        </div>

        <div 
          className="flex items-center gap-2 flex-1 justify-end px-2 py-1.5 rounded-lg transition-all"
          style={{
            background: !homeHigherWinProb && awayWinProb > homeWinProb ? 'rgba(0, 166, 81, 0.15)' : 'transparent',
            border: !homeHigherWinProb && awayWinProb > homeWinProb ? '1px solid rgba(0, 166, 81, 0.3)' : 'none'
          }}
        >
          <div className="flex-1 min-w-0 text-right">
            <span className="text-sm font-semibold text-white truncate block">{match.teams.away.name}</span>
            {!homeHigherWinProb && awayWinProb > homeWinProb && (
              <span className="text-xs text-green-400 font-bold">Favorito</span>
            )}
          </div>
          {match.teams.away.logo && (
            <img src={match.teams.away.logo} alt={match.teams.away.name} className="w-8 h-8 object-contain flex-shrink-0" />
          )}
        </div>
      </div>

      <div 
        className="mb-3 p-2 rounded-lg" 
        style={{ 
          background: '#0d1117',
          border: '1px solid #30363d'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-400">Expected Goals (xG)</div>
          {homeHigherXG && (
            <span className="text-xs text-green-400 font-bold">🟢 {match.teams.home.name}</span>
          )}
          {awayXG > homeXG && (
            <span className="text-xs text-green-400 font-bold">🟢 {match.teams.away.name}</span>
          )}
        </div>
        <XGCompare
          xgHome={match.xg.home}
          xgAway={match.xg.away}
          homeName={match.teams.home.name}
          awayName={match.teams.away.name}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-lg p-2 text-center" style={{ background: '#0d1117', border: `1px solid ${goalProbColor}40` }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Target size={12} style={{ color: goalProbColor }} />
            <span className="text-xs text-gray-400">Prob. Gol</span>
          </div>
          <div className="text-lg font-black" style={{ color: goalProbColor }}>
            {match.goal_probability}%
          </div>
        </div>

        <div className="rounded-lg p-2 text-center" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Zap size={12} className="text-orange-400" />
            <span className="text-xs text-gray-400">At. Perig.</span>
          </div>
          <div className="text-sm font-bold text-white">
            <span className="text-green-400">{homeDangerous}</span>
            <span className="text-gray-500 mx-1">-</span>
            <span className="text-blue-400">{awayDangerous}</span>
          </div>
        </div>

        <div className="rounded-lg p-2 text-center" style={{ background: '#0d1117', border: '1px solid #30363d' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flag size={12} className="text-yellow-400" />
            <span className="text-xs text-gray-400">Escanteios</span>
          </div>
          <div className="text-sm font-bold text-white">
            <span className="text-green-400">{match.statistics.home.corners}</span>
            <span className="text-gray-500 mx-1">-</span>
            <span className="text-blue-400">{match.statistics.away.corners}</span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <ProbabilityBar
          home={match.win_probability.home}
          draw={match.win_probability.draw}
          away={match.win_probability.away}
          homeName={match.teams.home.name}
          awayName={match.teams.away.name}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <span>
            <Shield size={10} className="inline mr-1 text-green-400" />
            <span className="text-green-400">{homeShotsOn}</span> chutes
          </span>
          <span>
            <TrendingUp size={10} className="inline mr-1 text-green-400" />
            <span className="text-green-400">{homeAttacks}</span> ataques
          </span>
        </div>
        <span className="text-gray-600 text-xs">Clique para detalhes</span>
        <div className="flex items-center gap-3">
          <span>
            <TrendingUp size={10} className="inline mr-1 text-blue-400" />
            <span className="text-blue-400">{awayAttacks}</span> ataques
          </span>
          <span>
            <Shield size={10} className="inline mr-1 text-blue-400" />
            <span className="text-blue-400">{awayShotsOn}</span> chutes
          </span>
        </div>
      </div>
    </div>
  );
};

