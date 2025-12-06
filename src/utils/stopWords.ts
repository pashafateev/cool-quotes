export const stopWords = new Set([
    "the", "is", "and", "a", "to", "in", "of", "on", "for", "with",
    "that", "it", "which", "as", "at", "by", "from", "this", "be", "or",
    "an", "are", "was", "were", "but", "not", "have", "has", "had", "they",
    "you", "i", "he", "she", "we", "their", "his", "her", "its", "them",
    "so", "if", "then", "there", "when", "where", "who", "what", "how",
    "all", "can", "will", "could", "do", "does", "did",
    "no", "about", "up", "down", "out", "over", "again",
    "more", "most", "some", "such", "only", "own", "same", "too", "very",
  "me", "also"
  ]);
  
  export function cleanWord(word: string): string {
    return word.toLowerCase().replace(/[^\w']/g, ""); // keeps apostrophes, removes other punctuation
  }