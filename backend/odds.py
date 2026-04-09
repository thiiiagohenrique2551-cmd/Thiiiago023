"""
Odds Integration Module - Integração com APIs de Odds em Tempo Real
Suporta múltiplas casas de apostas
"""

import requests
from typing import Dict, List, Optional
from datetime import datetime

class OddsProvider:
    """Base class para provedores de odds"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
    
    def get_odds(self, fixture_id: int) -> Optional[Dict]:
        """Retorna odds para uma partida"""
        raise NotImplementedError

class BetAPIProvider(OddsProvider):
    """Provedor usando BetAPI (Gratuito)"""
    
    BASE_URL = "https://api.api-football.com/v3"
    
    def __init__(self, api_key: str):
        super().__init__(api_key)
        self.headers = {"x-apisports-key": api_key}
    
    def get_odds(self, fixture_id: int) -> Optional[Dict]:
        """Busca odds do fixture"""
        try:
            url = f"{self.BASE_URL}/odds"
            params = {
                "fixture": fixture_id,
                "bookmaker": "1xbet"  # 1xBet como exemplo
            }
            
            response = requests.get(url, params=params, headers=self.headers, timeout=5)
            
            if response.status_code == 200:
                data = response.json()
                return self._parse_odds(data)
            
            return None
        except Exception as e:
            print(f"Erro ao buscar odds: {e}")
            return None
    
    def _parse_odds(self, data: Dict) -> Dict:
        """Processa dados de odds da API"""
        if not data.get("response"):
            return None
        
        odds_data = data["response"][0] if data["response"] else None
        if not odds_data:
            return None
        
        bookmakers = odds_data.get("bookmakers", [])
        if not bookmakers:
            return None
        
        bookmaker = bookmakers[0]
        bets = bookmaker.get("bets", [])
        
        odds = {
            "bookmaker": bookmaker.get("name"),
            "updated_at": datetime.now().isoformat(),
            "markets": {}
        }
        
        # Extrair odds por mercado
        for bet in bets:
            market_name = bet.get("name")
            values = bet.get("values", [])
            
            odds["markets"][market_name] = {
                "values": [
                    {
                        "name": v.get("name"),
                        "odd": float(v.get("odd", 0))
                    }
                    for v in values
                ]
            }
        
        return odds

class SimulatedOddsProvider(OddsProvider):
    """Provedor simulado de odds (para testes)"""
    
    def get_odds(self, fixture_id: int) -> Dict:
        """Retorna odds simuladas realistas"""
        return {
            "bookmaker": "Bet365",
            "updated_at": datetime.now().isoformat(),
            "markets": {
                "Match Winner": {
                    "values": [
                        {"name": "Home", "odd": 2.15},
                        {"name": "Draw", "odd": 3.40},
                        {"name": "Away", "odd": 3.20}
                    ]
                },
                "Over/Under 2.5": {
                    "values": [
                        {"name": "Over 2.5", "odd": 1.95},
                        {"name": "Under 2.5", "odd": 1.85}
                    ]
                },
                "Over/Under 1.5": {
                    "values": [
                        {"name": "Over 1.5", "odd": 1.45},
                        {"name": "Under 1.5", "odd": 2.65}
                    ]
                },
                "Over/Under 3.5": {
                    "values": [
                        {"name": "Over 3.5", "odd": 3.10},
                        {"name": "Under 3.5", "odd": 1.35}
                    ]
                },
                "Both Teams to Score": {
                    "values": [
                        {"name": "Yes", "odd": 1.75},
                        {"name": "No", "odd": 2.05}
                    ]
                },
                "Total Corners": {
                    "values": [
                        {"name": "Over 9.5", "odd": 1.90},
                        {"name": "Under 9.5", "odd": 1.90}
                    ]
                }
            }
        }

class OddsAggregator:
    """Agregador de odds de múltiplas casas"""
    
    def __init__(self):
        self.providers = {
            "simulated": SimulatedOddsProvider()
        }
    
    def add_provider(self, name: str, provider: OddsProvider):
        """Adiciona um novo provedor de odds"""
        self.providers[name] = provider
    
    def get_best_odds(self, fixture_id: int) -> Dict:
        """Retorna as melhores odds entre todos os provedores"""
        all_odds = {}
        
        for provider_name, provider in self.providers.items():
            try:
                odds = provider.get_odds(fixture_id)
                if odds:
                    all_odds[provider_name] = odds
            except Exception as e:
                print(f"Erro ao buscar odds de {provider_name}: {e}")
        
        # Se não tiver odds reais, usar simuladas
        if not all_odds:
            all_odds["simulated"] = self.providers["simulated"].get_odds(fixture_id)
        
        return {
            "fixture_id": fixture_id,
            "providers": all_odds,
            "best_odds": self._find_best_odds(all_odds),
            "updated_at": datetime.now().isoformat()
        }
    
    def _find_best_odds(self, all_odds: Dict) -> Dict:
        """Encontra as melhores odds para cada mercado"""
        best = {}
        
        for provider_name, odds_data in all_odds.items():
            for market, market_data in odds_data.get("markets", {}).items():
                if market not in best:
                    best[market] = {}
                
                for value in market_data.get("values", []):
                    value_name = value.get("name")
                    odd = value.get("odd")
                    
                    if value_name not in best[market]:
                        best[market][value_name] = {
                            "odd": odd,
                            "bookmaker": odds_data.get("bookmaker")
                        }
                    else:
                        # Manter a melhor (maior) odd
                        if odd > best[market][value_name]["odd"]:
                            best[market][value_name] = {
                                "odd": odd,
                                "bookmaker": odds_data.get("bookmaker")
                            }
        
        return best

# Instância global do agregador
odds_aggregator = OddsAggregator()
