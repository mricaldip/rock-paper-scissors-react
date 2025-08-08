import React, { useState } from "react";
import styles from './Game.module.css';

const CHOICES = [
  { id: 1, name: "rock", emoji: "✊" },
  { id: 2, name: "paper", emoji: "✋" },
  { id: 3, name: "scissors", emoji: "✌️" },
];

const choiceStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '40px'
};

const emojiStyles = {
  fontSize: '64px',
  marginRight: '20px'
};

const nameStyles = {
  margin: 0,
  fontSize: '24px',
  color: "#ffffff"
};

const resultStyle = {
  marginTop: '40px',
  fontSize: '48px',
  color: "#ffffff"
};

const determineWinner = (playerChoice, codeyChoice) => {
  if (playerChoice.name === codeyChoice.name) return "Tie!";
  
  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  return winConditions[playerChoice.name] === codeyChoice.name 
    ? "You win!" 
    : "You lose!";
};

function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [codeyChoice, setCodeyChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  const handlePlayerChoice = (choice) => {
    const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setPlayerChoice(choice);
    setCodeyChoice(randomChoice);
    const gameResult = determineWinner(choice, randomChoice);
    setResult(gameResult);
    setGameHistory([...gameHistory, {
      player: choice.name,
      computer: randomChoice.name,
      result: gameResult,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setCodeyChoice(null);
    setResult(null);
  };

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: '48px', marginTop: 0 }}>Rock Paper Scissors</h1>
      
      <div className={styles.choices}>
        {CHOICES.map((choice) => (
          <button
            className={styles.button}
            key={choice.id}
            onClick={() => handlePlayerChoice(choice)}
            aria-label={choice.name}
            disabled={playerChoice && !result}
          >
            {choice.emoji}
          </button>
        ))}
      </div>

      {playerChoice && codeyChoice && (
        <div className={styles.results}>
          <div style={choiceStyles}>
            <span style={emojiStyles}>{playerChoice.emoji}</span>
            <p style={nameStyles}>You chose {playerChoice.name}</p>
          </div>
          <div style={choiceStyles}>
            <span style={emojiStyles}>{codeyChoice.emoji}</span>
            <p style={nameStyles}>Computer chose {codeyChoice.name}</p>
          </div>
          <h2 style={resultStyle}>{result}</h2>
          <button className={styles.button} onClick={resetGame}>
            Play again
          </button>
        </div>
      )}

      {gameHistory.length > 0 && (
        <div className={styles.history}>
          <h3>Game History</h3>
          <ul>
            {gameHistory.map((game, index) => (
              <li key={index}>
                {game.timestamp}: You {game.player} vs Computer {game.computer} - {game.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Game;