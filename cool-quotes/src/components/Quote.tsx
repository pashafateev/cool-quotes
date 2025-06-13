import React from 'react';

const stopWords = new Set([
  "the", "is", "and", "a", "to", "in", "of", "on", "for", "with"
]);

function cleanWord(word: string): string {
  return word.toLowerCase().replace(/[^\w']/g, ""); // keeps apostrophes, removes other punctuation
}

interface QuoteProps {
  text: string;
  onWordClick: (word: string) => void;
}

export default function Quote({ text, onWordClick }: QuoteProps) {
  return (
    <p className="text-2xl leading-relaxed">
      {text.split(/\s+/).map((word, index) => {
        const cleaned = cleanWord(word);
        if (stopWords.has(cleaned)) return word + " ";

        return (
          <span
            key={index}
            onClick={() => onWordClick(cleaned)}
            className="cursor-pointer hover:text-blue-600 hover:underline transition-colors duration-200"
            style={{ marginRight: "0.25em" }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
} 