"""
Dados simulados para teste do app
Baseados em padrões reais de partidas de futebol
"""

import random
from datetime import datetime, timedelta

def generate_mock_matches():
    """Gera partidas simuladas com dados realistas"""
    
    teams_home = [
        "Manchester City", "Liverpool", "Arsenal", "Chelsea", "Manchester United",
        "Barcelona", "Real Madrid", "Atletico Madrid", "Bayern Munich", "Borussia Dortmund",
        "PSG", "Juventus", "Inter Milan", "AC Milan", "Napoli",
        "Ajax", "Benfica", "Porto", "Sporting CP", "Galatasaray"
    ]
    
    teams_away = [
        "Tottenham", "Aston Villa", "Brighton", "Newcastle", "West Ham",
        "Sevilla", "Valencia", "Villarreal", "Real Sociedad", "Girona",
        "Marseille", "Lens", "Nice", "Lyon", "Monaco",
        "Feyenoord", "PSV", "Braga", "Vitoria Guimaraes", "Fenerbahce"
    ]
    
    leagues = [
        {"id": 39, "name": "Premier League", "country": "England", "logo": "https://media.api-sports.io/leagues/39.png", "flag": "https://media.api-sports.io/flags/gb.svg"},
        {"id": 140, "name": "La Liga", "country": "Spain", "logo": "https://media.api-sports.io/leagues/140.png", "flag": "https://media.api-sports.io/flags/es.svg"},
        {"id": 78, "name": "Bundesliga", "country": "Germany", "logo": "https://media.api-sports.io/leagues/78.png", "flag": "https://media.api-sports.io/flags/de.svg"},
        {"id": 61, "name": "Ligue 1", "country": "France", "logo": "https://media.api-sports.io/leagues/61.png", "flag": "https://media.api-sports.io/flags/fr.svg"},
        {"id": 135, "name": "Serie A", "country": "Italy", "logo": "https://media.api-sports.io/leagues/135.png", "flag": "https://media.api-sports.io/flags/it.svg"},
    ]
    
    matches = []
    
    for i in range(15):
        home_idx = random.randint(0, len(teams_home) - 1)
        away_idx = random.randint(0, len(teams_away) - 1)
        league = random.choice(leagues)
        
        # Gerar estatísticas realistas
        possession_home = random.randint(35, 65)
        possession_away = 100 - possession_home
        
        # Big Chances (Chances Perigosas)
        big_chances_home = random.randint(1, 6)
        big_chances_away = random.randint(1, 6)
        
        # Conversão de chances (quanto melhor o time, melhor a conversão)
        conversion_home = random.uniform(0.15, 0.45)
        conversion_away = random.uniform(0.15, 0.45)
        
        # Gols baseados em chances
        goals_home = int(big_chances_home * conversion_home)
        goals_away = int(big_chances_away * conversion_away)
        
        # Minuto aleatório
        minute = random.randint(15, 85)
        
        # Shots on goal baseado em big chances
        shots_on_home = big_chances_home + random.randint(0, 3)
        shots_on_away = big_chances_away + random.randint(0, 3)
        
        # Ataques perigosos
        dangerous_attacks_home = big_chances_home * random.randint(2, 4)
        dangerous_attacks_away = big_chances_away * random.randint(2, 4)
        
        # Total de ataques
        attacks_home = dangerous_attacks_home * random.randint(3, 5)
        attacks_away = dangerous_attacks_away * random.randint(3, 5)
        
        # Escanteios
        corners_home = random.randint(2, 8)
        corners_away = random.randint(2, 8)
        
        # xG calculado
        xg_home = round(shots_on_home * 0.08 + big_chances_home * 0.15, 2)
        xg_away = round(shots_on_away * 0.08 + big_chances_away * 0.15, 2)
        
        # Probabilidades
        home_strength = possession_home * 0.3 + shots_on_home * 5 + big_chances_home * 8
        away_strength = possession_away * 0.3 + shots_on_away * 5 + big_chances_away * 8
        
        total_strength = home_strength + away_strength
        prob_home = (home_strength / total_strength * 100) if total_strength > 0 else 50
        prob_away = (away_strength / total_strength * 100) if total_strength > 0 else 50
        
        # Ajuste por placar
        if goals_home > goals_away:
            prob_home += 15
            prob_away -= 15
        elif goals_away > goals_home:
            prob_away += 15
            prob_home -= 15
        
        prob_draw = 100 - prob_home - prob_away
        
        # Normalizar
        total = prob_home + prob_away + prob_draw
        prob_home = round(prob_home / total * 100, 1)
        prob_away = round(prob_away / total * 100, 1)
        prob_draw = round(100 - prob_home - prob_away, 1)
        
        # Probabilidade de gol
        total_big_chances = big_chances_home + big_chances_away
        goal_probability = min(95, 30 + total_big_chances * 8)
        
        # Over/Under
        expected_goals = goals_home + goals_away + (big_chances_home + big_chances_away) * 0.3
        
        match = {
            "fixture_id": 1000000 + i,
            "league": league,
            "teams": {
                "home": {
                    "id": 1000 + home_idx,
                    "name": teams_home[home_idx],
                    "logo": f"https://media.api-sports.io/teams/logos/{1000 + home_idx}.png",
                    "winner": goals_home > goals_away
                },
                "away": {
                    "id": 2000 + away_idx,
                    "name": teams_away[away_idx],
                    "logo": f"https://media.api-sports.io/teams/logos/{2000 + away_idx}.png",
                    "winner": goals_away > goals_home
                }
            },
            "score": {
                "home": goals_home,
                "away": goals_away
            },
            "minute": minute,
            "status": "2H",
            "status_long": f"2nd Half - {minute}'",
            "xg": {
                "home": xg_home,
                "away": xg_away,
                "total": round(xg_home + xg_away, 2)
            },
            "win_probability": {
                "home": prob_home,
                "draw": prob_draw,
                "away": prob_away
            },
            "goal_probability": goal_probability,
            "corner_probability": round(min(95, 40 + (corners_home + corners_away) * 5), 1),
            "big_chances": {
                "home": big_chances_home,
                "away": big_chances_away,
                "total": big_chances_home + big_chances_away
            },
            "big_chances_probability": {
                "home": round(min(95, big_chances_home * 15), 1),
                "away": round(min(95, big_chances_away * 15), 1)
            },
            "over_under": {
                "over_1_5": round(min(99, 50 + expected_goals * 15), 1),
                "under_1_5": round(100 - min(99, 50 + expected_goals * 15), 1),
                "over_2_5": round(min(95, 30 + expected_goals * 12), 1),
                "under_2_5": round(100 - min(95, 30 + expected_goals * 12), 1),
                "over_3_5": round(min(85, 15 + expected_goals * 10), 1),
                "under_3_5": round(100 - min(85, 15 + expected_goals * 10), 1),
                "expected_total_goals": round(expected_goals, 2),
                "expected_remaining_goals": round((big_chances_home + big_chances_away) * 0.25, 2)
            },
            "ranking_score": round((xg_home + xg_away) * 10 + (big_chances_home + big_chances_away) * 2 + goal_probability * 0.3, 2),
            "statistics": {
                "home": {
                    "shots_on_goal": shots_on_home,
                    "shots_off_goal": random.randint(2, 8),
                    "total_shots": shots_on_home + random.randint(3, 8),
                    "shots_inside_box": big_chances_home,
                    "shots_outside_box": random.randint(1, 5),
                    "blocked_shots": random.randint(1, 4),
                    "fouls": random.randint(8, 18),
                    "corners": corners_home,
                    "offsides": random.randint(0, 3),
                    "possession": possession_home,
                    "yellow_cards": random.randint(0, 3),
                    "red_cards": 0,
                    "saves": random.randint(2, 8),
                    "total_passes": random.randint(300, 600),
                    "accurate_passes": random.randint(200, 500),
                    "passes_pct": round(random.uniform(60, 85), 1),
                    "attacks": attacks_home,
                    "dangerous_attacks": dangerous_attacks_home
                },
                "away": {
                    "shots_on_goal": shots_on_away,
                    "shots_off_goal": random.randint(2, 8),
                    "total_shots": shots_on_away + random.randint(3, 8),
                    "shots_inside_box": big_chances_away,
                    "shots_outside_box": random.randint(1, 5),
                    "blocked_shots": random.randint(1, 4),
                    "fouls": random.randint(8, 18),
                    "corners": corners_away,
                    "offsides": random.randint(0, 3),
                    "possession": possession_away,
                    "yellow_cards": random.randint(0, 3),
                    "red_cards": 0,
                    "saves": random.randint(2, 8),
                    "total_passes": random.randint(300, 600),
                    "accurate_passes": random.randint(200, 500),
                    "passes_pct": round(random.uniform(60, 85), 1),
                    "attacks": attacks_away,
                    "dangerous_attacks": dangerous_attacks_away
                }
            }
        }
        
        matches.append(match)
    
    # Ordenar por ranking score
    matches.sort(key=lambda m: m['ranking_score'], reverse=True)
    return matches
