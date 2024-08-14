import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import WordleGrid from './WordleGrid';
import WordleKeyboard from './WordleKeyboard';

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;

const WordleGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setSecretWord('PUZZLE');
  }, []);

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error("Please enter a 6-letter word.");
        return;
      }
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess.toUpperCase() === secretWord) {
        toast.success("Congratulations! You've guessed the word!");
        setGameOver(true);
      } else if (newGuesses.length === MAX_ATTEMPTS) {
        toast.error(`Game over! The word was ${secretWord}`);
        setGameOver(true);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">Colorful Wordle</h1>
      <WordleGrid 
        guesses={guesses} 
        currentGuess={currentGuess} 
        secretWord={secretWord}
      />
      <WordleKeyboard onKeyPress={handleKeyPress} guesses={guesses} secretWord={secretWord} />
    </div>
  );
};

export default WordleGame;