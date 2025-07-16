"use client";

import { Box } from "@mui/material";
import React from "react";
import { stopWords, cleanWord } from "@/utils/stopWords";
import { Quote as QuoteType } from "@/utils/searchUtils";
import QuotationMark from "./QuotationMark";

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
          <Box key={index} component="span" sx={{ marginRight: "0.25em" }}>
            {word}{" "}
          </Box>
        );
      }

      return (
        <Box
          key={index}
          component="span"
          onClick={() => onWordClick(cleaned)}
          sx={{
            marginRight: "0.25em",
            cursor: "pointer",
            color: "secondary.main",
            transition: "all 0.2s ease-in-out",
            display: "inline-block",
            "&:hover": {
              transform: "scale(1.05)",
              textShadow: "0 0 8px rgba(61, 173, 255, 0.3)",
            },
          }}
        >
          {word}{" "}
        </Box>
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
          position: "relative",
          display: "inline-block",
        }}
      >
        {/* Quotation mark positioned relative to the text block */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "-30px", sm: "-40px", md: "-50px" },
            left: { xs: "-25px", sm: "-30px", md: "-50px" },
            zIndex: 1,
          }}
        >
          <QuotationMark />
        </Box>

        {renderInteractiveText(quote.quote)}
      </Box>
    </Box>
  );
};

export default Quote;
