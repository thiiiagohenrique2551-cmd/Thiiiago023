export interface TeamStats {
  shots_on_goal: number;
  shots_off_goal: number;
  total_shots: number;
  shots_inside_box: number;
  shots_outside_box: number;
  blocked_shots: number;
  fouls: number;
  corners: number;
  offsides: number;
  possession: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  total_passes: number;
  accurate_passes: number;
  passes_pct: number;
  attacks: number;
  dangerous_attacks: number;
}

export interface BigChances {
  home: number;
  away: number;
  total: number;
}

export interface BigChancesProbability {
  home: number;
  away: number;
}

export interface OverUnder {
  over_1_5: number;
  under_1_5: number;
  over_2_5: number;
  under_2_5: number;
  over_3_5: number;
  under_3_5: number;
  expected_total_goals: number;
  expected_remaining_goals: number;
}

export interface Match {
  fixture_id: number;
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  score: {
    home: number;
    away: number;
  };
  minute: number;
  status: string;
  status_long: string;
  xg: {
    home: number;
    away: number;
    total: number;
  };
  win_probability: {
    home: number;
    draw: number;
    away: number;
  };
  goal_probability: number;
  corner_probability: number;
  big_chances?: BigChances;
  big_chances_probability?: BigChancesProbability;
  over_under: OverUnder;
  ranking_score: number;
  statistics: {
    home: TeamStats;
    away: TeamStats;
  };
  events?: any[];
}

export interface LiveMatchesResponse {
  success: boolean;
  count: number;
  matches: Match[];
  last_updated: string;
  message?: string;
}
