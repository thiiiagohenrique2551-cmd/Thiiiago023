import React from 'react';
import { Activity, Clock } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ background: '#161b22', border: '1px solid #30363d' }}
      >
        <Activity size={32} className="text-gray-600" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">
        {message || 'Nenhuma partida ao vivo'}
      </h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        Não há partidas reais em andamento no momento. As partidas ao vivo aparecem aqui automaticamente.
      </p>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Clock size={12} />
        <span>Verificando a cada 60 segundos...</span>
      </div>
    </div>
  );
};

export const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ background: '#1a0a0a', border: '1px solid #f85149' }}
      >
        <Activity size={32} style={{ color: '#f85149' }} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Erro ao carregar dados</h3>
      <p className="text-sm text-gray-500 max-w-xs mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
        style={{ background: '#00a651' }}
      >
        Tentar novamente
      </button>
    </div>
  );
};
