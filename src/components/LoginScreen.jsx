import { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onLogin, highScores }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <h1 className="game-title">🐀 Rat Chase Fromage 🧀</h1>
        <p className="game-subtitle">First Person Cheese Hunter</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            className="name-input"
            autoFocus
          />
          <button type="submit" className="start-button">
            Start Game
          </button>
        </form>

        <div className="high-scores">
          <h2>🏆 High Scores</h2>
          <div className="scores-list">
            {highScores.length === 0 ? (
              <p className="no-scores">No scores yet. Be the first!</p>
            ) : (
              highScores.map((score, index) => (
                <div key={score.id} className="score-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="player">{score.player_name}</span>
                  <span className="points">{score.score}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <p>🎮 Use WASD or Arrow Keys to move</p>
          <p>🧀 Collect cheese to score points</p>
          <p>⏱️ Each cheese gives you 10 points</p>
          <p>🏃 Move fast and collect as many as you can!</p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
