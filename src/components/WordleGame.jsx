import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import WordleGrid from './WordleGrid';
import WordleKeyboard from './WordleKeyboard';
import { getRandomWord, isValidWord } from '../utils/wordList';

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;

const WordleGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const todaysWord = getRandomWord();
      setSecretWord(todaysWord);
      console.log("Today's word is GRIEVE");
    }
  }, [gameStarted]);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-4xl font-bold text-green-500 mb-8 neon-text glitch">CYBER WORDLE</h1>
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-green-500 text-black font-bold py-2 px-4 rounded neon-border hover:bg-green-400 transition-colors"
        >
          INITIATE SEQUENCE
        </button>
      ) : (
        <>
          <WordleGrid guesses={guesses} currentGuess={currentGuess} secretWord={secretWord} />
          <WordleKeyboard onKeyPress={handleKeyPress} guesses={guesses} secretWord={secretWord} />
          {gameOver && (
            <button
              onClick={startGame}
              className="mt-4 bg-green-500 text-black font-bold py-2 px-4 rounded neon-border hover:bg-green-400 transition-colors"
            >
              REBOOT SYSTEM
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default WordleGame;