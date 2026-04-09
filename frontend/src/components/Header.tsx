import React from 'react';
import { Activity, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  totalMatches: number;
  lastUpdated: string;
  loading: boolean;
  onRefresh: () => void;
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ totalMatches, lastUpdated, loading, onRefresh, isConnected }) => {
  return (
    <header className="sticky top-0 z-40" style={{ background: '#0d1117', borderBottom: '1px solid #30363d' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00a651, #007a3d)' }}
          >
            <Activity size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight">XG ANALYTICS</div>
            <div className="text-xs" style={{ color: '#00a651' }}>APOSTAS ESPORTIVAS AO VIVO</div>
          </div>
        </div>

        {/* Status e Refresh */}
        <div className="flex items-center gap-3">
          {/* Status de conexão */}
          <div className="flex items-center gap-1.5">
            {isConnected ? (
              <Wifi size={12} className="text-green-400" />
            ) : (
              <WifiOff size={12} className="text-red-400" />
            )}
            <span className="text-xs" style={{ color: isConnected ? '#00a651' : '#f85149' }}>
              {isConnected ? 'AO VIVO' : 'OFFLINE'}
            </span>
          </div>

          {/* Botão de refresh */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: loading ? '#1c2333' : '#00a651',
              color: loading ? '#8b949e' : '#fff',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Atualizando...' : 'Atualizar'}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ background: '#161b22' }}>
        <div className="flex items-center gap-4">
          {/* Partidas ao vivo */}
          <div className="flex items-center gap-1.5">
            <div className="live-dot w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-400">
              <span className="font-bold text-white">{totalMatches}</span> partidas ao vivo
            </span>
          </div>

          {/* Apenas jogos reais */}
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-gray-400">Apenas jogos reais</span>
          </div>
        </div>

        {/* Última atualização */}
        {lastUpdated && (
          <span className="text-xs text-gray-500">
            Atualizado: {lastUpdated}
          </span>
        )}
      </div>
    </header>
  );
};
