"use client";
import { Box } from "@mui/material";
import { Quote as QuoteType } from "@/utils/searchUtils";
import Quote from "@/components/Quote";
import Author from "@/components/Author";
import {
  useTransform,
  motion,
  MotionValue,
  useMotionValue,
} from "framer-motion";

interface CardProps {
  q: QuoteType;
  onWordClick: (word: string) => void;
  color: string;
  i: number;
  progress: MotionValue<number> | null; // scrollYProgress from framer-motion
  range: [number, number];
  targetScale: number;
}

const Card = ({
  q,
  onWordClick,
  color,
  i,
  progress,
  range,
  targetScale,
}: CardProps) => {
  // Create a fallback motion value when progress is null
  const fallbackProgress = useMotionValue(0);
  const actualProgress = progress || fallbackProgress;

  // Always call useTransform to follow Rules of Hooks
  const scale = useTransform(actualProgress, range, [1, targetScale]);

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
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "500px",
          width: "1000px",
          borderRadius: "25px",
          padding: "50px",
          transformOrigin: "top",
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
      </motion.div>
    </Box>
  );
};

export default Card;
