import React from 'react';

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const WordleKeyboard = ({ onKeyPress, guesses, secretWord }) => {
  const getKeyColor = (key) => {
    if (guesses.some(guess => guess.includes(key) && secretWord.includes(key))) {
      return 'bg-yellow-500 border-yellow-600';
    }
    if (guesses.some(guess => guess.split('').some((letter, index) => letter === key && secretWord[index] === key))) {
      return 'bg-green-500 border-green-600';
    }
    if (guesses.some(guess => guess.includes(key) && !secretWord.includes(key))) {
      return 'bg-gray-700 border-gray-600';
    }
    return 'bg-gray-800 border-gray-700';
  };

  return (
    <div className="mt-4">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1 sm:mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${
                key === 'ENTER' || key === 'BACKSPACE' ? 'w-12 sm:w-16' : 'w-8 sm:w-10'
              } h-10 sm:h-12 mx-0.5 text-xs sm:text-sm font-bold rounded border-2 ${getKeyColor(key)} text-white hover:opacity-80 transition-opacity neon-border`}
            >
              {key === 'BACKSPACE' ? '←' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleKeyboard;