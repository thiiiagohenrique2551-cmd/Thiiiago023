import React from 'react';

export const MatchCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl p-4 mb-3" style={{ background: '#161b22', border: '1px solid #30363d' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="skeleton w-32 h-3 rounded" />
        </div>
        <div className="skeleton w-12 h-3 rounded" />
      </div>

      {/* Times e Placar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="skeleton w-24 h-4 rounded" />
        </div>
        <div className="flex items-center gap-2 mx-3">
          <div className="skeleton w-8 h-8 rounded" />
          <div className="skeleton w-4 h-4 rounded" />
          <div className="skeleton w-8 h-8 rounded" />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="skeleton w-24 h-4 rounded" />
          <div className="skeleton w-8 h-8 rounded-full" />
        </div>
      </div>

      {/* xG */}
      <div className="skeleton w-full h-12 rounded-lg mb-3" />

      {/* Métricas */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="skeleton h-16 rounded-lg" />
        <div className="skeleton h-16 rounded-lg" />
        <div className="skeleton h-16 rounded-lg" />
      </div>

      {/* Prob bar */}
      <div className="skeleton w-full h-6 rounded-lg" />
    </div>
  );
};

export const LoadingState: React.FC = () => {
  return (
    <div className="px-4 pt-4">
      {[1, 2, 3, 4].map(i => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  );
};
