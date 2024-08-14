import React, { useState, useEffect } from 'react';

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;
const REVEAL_DELAY = 300; // 0.3 seconds

const WordleGrid = ({ guesses, currentGuess, secretWord }) => {
  const [revealedLetters, setRevealedLetters] = useState([]);

  useEffect(() => {
    if (guesses.length > 0) {
      const lastGuess = guesses[guesses.length - 1];
      let timer;
      for (let i = 0; i < WORD_LENGTH; i++) {
        timer = setTimeout(() => {
          setRevealedLetters(prev => [...prev, `${guesses.length - 1}-${i}`]);
        }, i * REVEAL_DELAY);
      }
      return () => clearTimeout(timer);
    }
  }, [guesses]);

  const getLetterColor = (letter, index, word) => {
    if (secretWord[index] === letter) {
      return 'bg-green-500 border-green-600';
    } else if (secretWord.includes(letter)) {
      return 'bg-yellow-500 border-yellow-600';
    }
    return 'bg-gray-300 border-gray-400';
  };

  return (
    <div className="grid grid-rows-6 gap-1 mb-6">
      {[...Array(MAX_ATTEMPTS)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-1">
          {[...Array(WORD_LENGTH)].map((_, colIndex) => {
            const letter = guesses[rowIndex]?.[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
            const isRevealed = revealedLetters.includes(`${rowIndex}-${colIndex}`);
            const colorClass = guesses[rowIndex] && isRevealed
              ? getLetterColor(letter, colIndex, guesses[rowIndex])
              : 'bg-white border-gray-300';
            return (
              <div
                key={colIndex}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold text-gray-800 rounded border ${colorClass} transition-all duration-300 ${isRevealed ? 'rotate-y-180' : ''}`}
              >
                <div className={`transition-all duration-300 ${isRevealed ? 'rotate-y-180' : ''}`}>
                  {letter}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;