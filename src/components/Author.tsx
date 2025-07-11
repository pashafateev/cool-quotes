import { Box, Typography } from "@mui/material";
import React from "react";
import { Quote } from "@/utils/searchUtils";

interface AuthorProps {
  quote?: Quote | null;
}

const Author: React.FC<AuthorProps> = ({ quote }) => {
  // If no quote data, don't render anything
  if (!quote || !quote.authors || quote.authors.length === 0) {
    return null;
  }

  const author = quote.authors[0]; // Use the first author
  const reference =
    quote.references && quote.references.length > 0
      ? quote.references[0]
      : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        maxWidth: { xs: "90vw", sm: "800px", md: "1000px" },
        minHeight: "fit-content",
        marginTop: 2,
        px: { xs: 2, sm: 3, md: 4 },
        pr: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Typography
        variant="h5"
        align="right"
        sx={{
          fontFamily: "'Plantagenet-Regular', Helvetica",
          fontSize: { xs: "20px", sm: "24px", md: "28px", lg: "32px" },
          lineHeight: 1.2,
          color: "#1c1d1f",
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Box component="span">- {author}</Box>
        {reference && (
          <Box
            component="span"
            sx={{
              fontFamily: "'Plantagenet-Italic', Helvetica",
              fontStyle: "italic",
            }}
          >
            , {reference}
          </Box>
        )}
      </Typography>
    </Box>
  );
};

export default Author;
