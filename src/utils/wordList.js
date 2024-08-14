// This is an expanded list including more words and plural forms.
export const wordList = [
  "PUZZLE", "JIGSAW", "RIDDLE", "ENIGMA", "CIPHER", "GRIEVE",
  "QUANDARY", "DILEMMA", "MYSTERY", "PROBLEM", "QUESTION", "CHALLENGE",
  "PARADOX", "QUAGMIRE", "LABYRINTH", "MAZES", "REBUS", "CHARADE",
  "PUZZLES", "RIDDLES", "CIPHERS", "ENIGMAS", "PROBLEMS", "QUESTIONS",
  "APPLES", "BANANAS", "CHERRIES", "DONUTS", "ECHOES", "FISHES",
  "GRAPES", "HOUSES", "IGLOOS", "JACKETS", "KITTENS", "LEMONS",
  "MANGOES", "NOODLES", "ORANGES", "PENCILS", "QUEENS", "RABBITS",
  "SNAKES", "TIGERS", "UMBRELLAS", "VIOLINS", "WOLVES", "XYLOPHONES",
  "YACHTS", "ZEBRAS", "BOTTLES", "CAMERAS", "DISHES", "EAGLES"
];

export const getRandomWord = () => {
  // For demonstration, we're returning a fixed word
  return "GRIEVE";
};

export const isValidWord = (word) => {
  const upperWord = word.toUpperCase();
  // Check if the word is in our list, or if its singular form (removing 'S') is in the list
  return wordList.includes(upperWord) || (upperWord.endsWith('S') && wordList.includes(upperWord.slice(0, -1)));
};