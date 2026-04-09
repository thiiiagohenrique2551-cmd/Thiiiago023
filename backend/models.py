"""
Database models for XG Sports App
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    """User model for authentication"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    email = Column(String, unique=True, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    bets = relationship("Bet", back_populates="user")
    
    def __repr__(self):
        return f"<User {self.username}>"

class Match(Base):
    """Match model to store match history"""
    __tablename__ = "matches"
    
    id = Column(Integer, primary_key=True, index=True)
    fixture_id = Column(Integer, unique=True, index=True)
    league_name = Column(String)
    league_country = Column(String)
    home_team = Column(String)
    away_team = Column(String)
    home_score = Column(Integer)
    away_score = Column(Integer)
    status = Column(String)  # 1H, 2H, FT, etc
    minute = Column(Integer)
    xg_home = Column(Float)
    xg_away = Column(Float)
    win_probability_home = Column(Float)
    win_probability_draw = Column(Float)
    win_probability_away = Column(Float)
    goal_probability = Column(Float)
    corner_probability = Column(Float)
    big_chances_home = Column(Integer)
    big_chances_away = Column(Integer)
    over_1_5 = Column(Float)
    over_2_5 = Column(Float)
    over_3_5 = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    bets = relationship("Bet", back_populates="match")
    
    def __repr__(self):
        return f"<Match {self.home_team} vs {self.away_team}>"

class Bet(Base):
    """Bet model to store user bets"""
    __tablename__ = "bets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    match_id = Column(Integer, ForeignKey("matches.id"))
    bet_type = Column(String)  # over_under, winner, big_chances, etc
    bet_value = Column(String)  # 1.5, 2.5, 3.5, home, draw, away, etc
    odds = Column(Float)
    amount = Column(Float)
    status = Column(String)  # pending, won, lost
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="bets")
    match = relationship("Match", back_populates="bets")
    
    def __repr__(self):
        return f"<Bet {self.user_id} - {self.bet_type} - {self.status}>"
