"use client";
import { Box } from "@mui/material";
import { Quote as QuoteType } from "@/utils/searchUtils";
import Quote from "@/components/Quote";
import Author from "@/components/Author";

interface CardProps {
  q: QuoteType;
  onWordClick: (word: string) => void;
  color: string;
  i: number;
}

const Card = ({ q, onWordClick, color, i }: CardProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "500px",
          width: "1000px",
          borderRadius: "25px",
          padding: "50px",
          backgroundColor: color,
          transformOrigin: "top",
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            marginTop: "50px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Quote quote={q} onWordClick={onWordClick} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Author quote={q} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
