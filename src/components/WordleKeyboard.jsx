import React from 'react';

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

const WordleKeyboard = ({ onKeyPress, guesses, secretWord }) => {
  const getKeyColor = (key) => {
    if (guesses.some(guess => guess.includes(key) && secretWord.includes(key))) {
      return 'bg-yellow-500';
    }
    if (guesses.some(guess => guess.split('').some((letter, index) => letter === key && secretWord[index] === key))) {
      return 'bg-green-500';
    }
    if (guesses.some(guess => guess.includes(key) && !secretWord.includes(key))) {
      return 'bg-gray-500';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="mt-4">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`${
                key === 'ENTER' || key === 'BACKSPACE' ? 'w-16' : 'w-10'
              } h-12 mx-0.5 text-sm font-bold rounded ${getKeyColor(key)} text-white hover:opacity-80 transition-opacity`}
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