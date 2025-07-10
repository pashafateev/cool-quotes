import { Box, Typography } from "@mui/material";
import React from "react";

interface QuoteProps {
  quote: string;
  author?: string;
  reference?: string;
  tags?: string[];
  likes?: number;
}

const Quote: React.FC<QuoteProps> = ({
  quote,
//   author,
//   reference,
//   tags = [],
//   likes = 0,
}) => {
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
      {/* Main Quote Text */}
      <Typography
        variant="h2"
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
          mb: { xs: 2, sm: 3 },
          wordWrap: "break-word",
          hyphens: "auto",
        }}
      >
        {quote}
      </Typography>

    </Box>
  );
};

export default Quote;
