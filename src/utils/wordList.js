import { toast } from "sonner";

export const wordList = [
  "PUZZLE", "JIGSAW", "RIDDLE", "ENIGMA", "CIPHER", "GRIEVE",
  // ... (keep the rest of the word list)
];

export const getRandomWord = () => {
  // For demonstration, we're returning a fixed word
  return "GRIEVE";
};

export const isValidWord = async (word) => {
  if (word.length !== 6) {
    return false;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking word validity:", error);
    toast.error("Error checking word. Please try again.");
    return false;
  }
};