export const stopWords = new Set([
    "the", "is", "and", "a", "to", "in", "of", "on", "for", "with",
    "that", "it", "which", "as", "at", "by", "from", "this", "be", "or",
    "an", "are", "was", "were", "but", "not", "have", "has", "had", "they",
    "you", "i", "he", "she", "we", "their", "his", "her", "its", "them",
    "so", "if", "then", "there", "when", "where", "who", "what", "how",
    "all", "can", "will", "would", "should", "could", "do", "does", "did",
    "no", "yes", "about", "up", "down", "out", "over", "under", "again",
    "more", "most", "some", "such", "only", "own", "same", "too", "very"
  ]);
  
  export function cleanWord(word: string): string {
    return word.toLowerCase().replace(/[^\w']/g, ""); // keeps apostrophes, removes other punctuation
  }