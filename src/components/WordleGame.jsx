import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import WordleGrid from './WordleGrid';
import WordleKeyboard from './WordleKeyboard';
import { isValidWord } from '../utils/wordList';

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;

const WordleGame = () => {
  const [secretWord, setSecretWord] = useState('GRIEVE');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  };

  const handleKeyPress = async (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error("Word must be 6 letters long.");
        return;
      }
      
      const isValid = await isValidWord(currentGuess);
      if (!isValid) {
        toast.error("Not a valid word. Please try again.");
        return;
      }

      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess.toUpperCase() === secretWord) {
        toast.success(`Congratulations! You've guessed the word in ${newGuesses.length}/6 attempts!`);
        setGameOver(true);
      } else if (newGuesses.length === MAX_ATTEMPTS) {
        toast.error(`Oops, today is not your day. Try again tomorrow. The word was ${secretWord}`);
        setGameOver(true);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-light text-yellow-200 mb-6 sm:mb-8 tracking-wide">6-letter Wordle</h1>
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Start Game
        </button>
      ) : (
        <>
          <WordleGrid guesses={guesses} currentGuess={currentGuess} secretWord={secretWord} />
          <WordleKeyboard onKeyPress={handleKeyPress} guesses={guesses} secretWord={secretWord} />
          {gameOver && (
            <button
              onClick={startGame}
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WordleGame;