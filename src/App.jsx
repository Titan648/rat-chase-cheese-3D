import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LoginScreen from './components/LoginScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

function App() {
  const [gameState, setGameState] = useState('login'); // login, playing, gameover
  const [playerName, setPlayerName] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    const { data, error } = await supabase
      .from('scores')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (!error && data) {
      setHighScores(data);
    }
  };

  const handleLogin = (name) => {
    setPlayerName(name);
    setGameState('playing');
    setCurrentScore(0);
  };

  const handleGameOver = async (finalScore) => {
    setCurrentScore(finalScore);
    
    // Save score to database
    await supabase.from('scores').insert([
      { player_name: playerName, score: finalScore }
    ]);

    await fetchHighScores();
    setGameState('gameover');
  };

  const handlePlayAgain = () => {
    setCurrentScore(0);
    setGameState('playing');
  };

  const handleBackToLogin = () => {
    setPlayerName('');
    setCurrentScore(0);
    setGameState('login');
  };

  return (
    <>
      {gameState === 'login' && (
        <LoginScreen onLogin={handleLogin} highScores={highScores} />
      )}
      {gameState === 'playing' && (
        <Game 
          playerName={playerName} 
          onGameOver={handleGameOver}
        />
      )}
      {gameState === 'gameover' && (
        <GameOver
          score={currentScore}
          playerName={playerName}
          highScores={highScores}
          onPlayAgain={handlePlayAgain}
          onBackToLogin={handleBackToLogin}
        />
      )}
    </>
  );
}

export default App;
