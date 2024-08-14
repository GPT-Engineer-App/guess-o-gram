// This is a placeholder list. In a real implementation, you'd want a much larger list of common 6-letter words.
export const wordList = [
  "PUZZLE", "JIGSAW", "RIDDLE", "ENIGMA", "CIPHER", "CONUNDRUM",
  "QUANDARY", "DILEMMA", "MYSTERY", "PROBLEM", "QUESTION", "CHALLENGE",
  "BRAINTEASER", "PARADOX", "QUAGMIRE", "PERPLEXITY", "LABYRINTH", "MAZE",
  "REBUS", "CHARADE"
];

export const getRandomWord = () => {
  // For demonstration, we're returning a fixed word
  return "GRIEVE";
};

export const isValidWord = (word) => {
  return wordList.includes(word.toUpperCase());
};