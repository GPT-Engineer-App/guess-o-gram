import React from 'react';

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;

const WordleGrid = ({ guesses, currentGuess, secretWord }) => {
  const getLetterColor = (letter, index, word) => {
    if (secretWord[index] === letter) {
      return 'bg-green-500 border-green-600';
    } else if (secretWord.includes(letter)) {
      return 'bg-yellow-500 border-yellow-600';
    }
    return 'bg-gray-700 border-gray-600';
  };

  return (
    <div className="grid grid-rows-6 gap-1 mb-4">
      {[...Array(MAX_ATTEMPTS)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-1">
          {[...Array(WORD_LENGTH)].map((_, colIndex) => {
            const letter = guesses[rowIndex]?.[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
            const colorClass = guesses[rowIndex] ? getLetterColor(letter, colIndex, guesses[rowIndex]) : 'bg-gray-800 border-gray-700';
            return (
              <div
                key={colIndex}
                className={`w-12 h-12 flex items-center justify-center text-2xl font-bold text-white rounded border-2 ${colorClass} transition-colors duration-300`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;