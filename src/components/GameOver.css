import './GameOver.css';

function GameOver({ score, playerName, highScores, onPlayAgain, onBackToLogin }) {
  const playerRank = highScores.findIndex(s => s.player_name === playerName && s.score === score) + 1;

  return (
    <div className="gameover-screen">
      <div className="gameover-container">
        <h1 className="gameover-title">Game Over!</h1>
        
        <div className="final-score">
          <p className="score-label">Final Score</p>
          <p className="score-value">{score}</p>
          {playerRank > 0 && playerRank <= 10 && (
            <p className="rank-badge">🏆 Rank #{playerRank}</p>
          )}
        </div>

        <div className="player-stats">
          <p>Well done, <strong>{playerName}</strong>!</p>
          <p>You collected {score / 10} cheese{score !== 10 ? 's' : ''}! 🧀</p>
        </div>

        <div className="high-scores-gameover">
          <h2>🏆 High Scores</h2>
          <div className="scores-list">
            {highScores.slice(0, 10).map((s, index) => (
              <div 
                key={s.id} 
                className={`score-item ${s.player_name === playerName && s.score === score ? 'highlight' : ''}`}
              >
                <span className="rank">#{index + 1}</span>
                <span className="player">{s.player_name}</span>
                <span className="points">{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gameover-buttons">
          <button onClick={onPlayAgain} className="play-again-button">
            🎮 Play Again
          </button>
          <button onClick={onBackToLogin} className="back-button">
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
