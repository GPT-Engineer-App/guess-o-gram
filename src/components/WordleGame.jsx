import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WORD_LENGTH = 6;
const MAX_ATTEMPTS = 6;

const WordleGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // In a real implementation, this would fetch a new word daily
    setSecretWord('PUZZLE');
  }, []);

  const handleGuess = () => {
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
  };

  const getLetterColor = (letter, index, word) => {
    if (secretWord[index] === letter) {
      return 'bg-green-500';
    } else if (secretWord.includes(letter)) {
      return 'bg-yellow-500';
    }
    return 'bg-gray-500';
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Wordle Clone</h1>
      <div className="mb-4">
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="flex mb-2">
            {guess.split('').map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`w-10 h-10 flex items-center justify-center text-white font-bold mr-1 ${getLetterColor(letter, letterIndex, guess)}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <div className="flex mb-4">
          <Input
            type="text"
            maxLength={WORD_LENGTH}
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            className="mr-2"
            placeholder="Enter your guess"
          />
          <Button onClick={handleGuess}>Guess</Button>
        </div>
      )}
      <p className="text-sm text-gray-600">
        Guess the 6-letter word in {MAX_ATTEMPTS} tries.
      </p>
    </div>
  );
};

export default WordleGame;