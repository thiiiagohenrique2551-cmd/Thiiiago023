import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar, type SortType } from './components/FilterBar';
import { MatchCard } from './components/MatchCard';
import { MatchDetail } from './components/MatchDetail';
import { LoadingState } from './components/LoadingSkeleton';
import { EmptyState, ErrorState } from './components/EmptyState';
import { useLiveMatches } from './hooks/useLiveMatches';
import type { Match } from './types';

function App() {
  const { matches, loading, error, lastUpdated, totalCount, refresh } = useLiveMatches();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [sortBy, setSortBy] = useState<SortType>('ranking');
  const [filterLeague, setFilterLeague] = useState('');

  const leagues = useMemo(() => {
    const leagueSet = new Set(matches.map(m => m.league.name));
    return Array.from(leagueSet).sort();
  }, [matches]);

  const processedMatches = useMemo(() => {
    let filtered = matches;
    if (filterLeague) {
      filtered = filtered.filter(m => m.league.name === filterLeague);
    }
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'goal_prob': return b.goal_probability - a.goal_probability;
        case 'xg_total': return b.xg.total - a.xg.total;
        case 'corner_prob': return b.corner_probability - a.corner_probability;
        case 'minute': return b.minute - a.minute;
        default: return b.ranking_score - a.ranking_score;
      }
    });
    return sorted;
  }, [matches, sortBy, filterLeague]);

  return (
    <div className="min-h-screen" style={{ background: '#0d1117' }}>
      <Header totalMatches={totalCount} lastUpdated={lastUpdated} loading={loading} onRefresh={refresh} isConnected={!error} />
      {!loading && matches.length > 0 && (
        <FilterBar sortBy={sortBy} onSortChange={setSortBy} filterLeague={filterLeague} onFilterLeague={setFilterLeague} leagues={leagues} />
      )}
      <main className="max-w-2xl mx-auto">
        {loading && <LoadingState />}
        {!loading && error && <ErrorState error={error} onRetry={refresh} />}
        {!loading && !error && processedMatches.length === 0 && (
          <EmptyState message={filterLeague ? `Nenhuma partida ao vivo em ${filterLeague}` : undefined} />
        )}
        {!loading && !error && processedMatches.length > 0 && (
          <div className="px-4 pt-4 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-white">Ranking ao Vivo</h2>
                <p className="text-xs text-gray-500">
                  {sortBy === 'ranking' && 'Ordenado por maior probabilidade de gol'}
                  {sortBy === 'goal_prob' && 'Ordenado por maior probabilidade de gol'}
                  {sortBy === 'xg_total' && 'Ordenado por maior xG total'}
                  {sortBy === 'corner_prob' && 'Ordenado por maior probabilidade de escanteios'}
                  {sortBy === 'minute' && 'Ordenado por minuto mais avancado'}
                </p>
              </div>
              <span className="text-xs text-gray-500">{processedMatches.length} partidas</span>
            </div>
            {processedMatches.map((match, index) => (
              <MatchCard key={match.fixture_id} match={match} rank={index + 1} onClick={() => setSelectedMatch(match)} />
            ))}
          </div>
        )}
      </main>
      {selectedMatch && <MatchDetail match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
      <footer className="text-center py-4 text-xs text-gray-600 border-t" style={{ borderColor: '#30363d' }}>
        <p>XG Analytics - Dados em tempo real - Apenas partidas reais</p>
        <p className="mt-1">Atualizacao automatica a cada 60 segundos</p>
      </footer>
    </div>
  );
}

export default App;
