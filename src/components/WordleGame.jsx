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

  const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error("Word must be 6 letters long.");
        return;
      }
      if (currentGuess.length !== WORD_LENGTH) {
        toast.error("Word must be 6 letters long.");
        return;
      }
      // We've removed the isValidWord check here
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

  const shareResults = () => {
    const result = guesses.map(guess => 
      guess.split('').map((letter, index) => 
        secretWord[index] === letter ? '🟩' : secretWord.includes(letter) ? '🟨' : '⬜'
      ).join('')
    ).join('\n');
    const shareText = `6-Letter Wordle: ${guesses.length}/6\n\n${result}`;
    navigator.clipboard.writeText(shareText).then(() => {
      toast.success("Results copied to clipboard!");
    });
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">6-Letter Wordle</h1>
        <p className="mb-4 text-center">
          Guess the 6-letter word in 6 tries. After each guess, the color of the tiles will
          change to show how close your guess was to the word.
        </p>
        <button 
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-white">6-Letter Wordle</h1>
      <WordleGrid 
        guesses={guesses} 
        currentGuess={currentGuess} 
        secretWord={secretWord}
      />
      <WordleKeyboard onKeyPress={handleKeyPress} guesses={guesses} secretWord={secretWord} />
      {gameOver && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={shareResults}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
          >
            Share Results
          </button>
          <button 
            onClick={startGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WordleGame;