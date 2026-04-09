import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Match, LiveMatchesResponse } from '../types';

const REFRESH_INTERVAL = 60000; // 60 segundos

export function useLiveMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [totalCount, setTotalCount] = useState(0);

  const fetchMatches = useCallback(async () => {
    try {
      const response = await axios.get<LiveMatchesResponse>('/api/live-matches');
      if (response.data.success) {
        setMatches(response.data.matches);
        setTotalCount(response.data.count);
        setLastUpdated(response.data.last_updated || new Date().toLocaleTimeString('pt-BR'));
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar partidas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  return { matches, loading, error, lastUpdated, totalCount, refresh: fetchMatches };
}

export function useMatchDetail(fixtureId: number | null) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatch = useCallback(async () => {
    if (!fixtureId) return;
    setLoading(true);
    try {
      const response = await axios.get(`/api/match/${fixtureId}`);
      if (response.data.success) {
        setMatch(response.data.match);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar partida');
    } finally {
      setLoading(false);
    }
  }, [fixtureId]);

  useEffect(() => {
    fetchMatch();
    if (!fixtureId) return;
    const interval = setInterval(fetchMatch, 30000); // Atualiza a cada 30s no detalhe
    return () => clearInterval(interval);
  }, [fetchMatch, fixtureId]);

  return { match, loading, error, refresh: fetchMatch };
}
