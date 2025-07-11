import { Box, Typography } from "@mui/material";
import React from "react";
import { stopWords, cleanWord } from "@/utils/stopWords";
import { Quote as QuoteType } from "@/utils/searchUtils";

interface QuoteProps {
  quote: QuoteType;
  onWordClick?: (word: string) => void;
}

const Quote: React.FC<QuoteProps> = ({ quote, onWordClick }) => {
  const renderInteractiveText = (text: string) => {
    if (!onWordClick) {
      return text;
    }

    return text.split(/\s+/).map((word, index) => {
      const cleaned = cleanWord(word);
      const isStopWord = stopWords.has(cleaned);

      if (isStopWord) {
        return (
          <span key={index} style={{ marginRight: "0.25em" }}>
            {word}{" "}
          </span>
        );
      }

      return (
        <span
          key={index}
          onClick={() => onWordClick(cleaned)}
          style={{
            marginRight: "0.25em",
            cursor: "pointer",
            color: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3dadff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "inherit";
          }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "90vw", sm: "800px", md: "1000px" },
        minHeight: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Box
        component="div"
        sx={{
          fontFamily: "Plantagenet-Regular, Helvetica",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
          },
          lineHeight: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3rem",
            lg: "3.5rem",
          },
          color: "text.primary",
          wordWrap: "break-word",
          hyphens: "auto",
          fontWeight: 400,
        }}
      >
        "{renderInteractiveText(quote.quote)}"
      </Box>
    </Box>
  );
};

export default Quote;
