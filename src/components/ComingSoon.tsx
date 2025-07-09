import { Box, Typography } from "@mui/material";
import React from "react";

const Label = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "904px",
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Plantagenet-Regular', Helvetica",
          color: "#1c1d1f",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          textAlign: "center",
          letterSpacing: 0,
          lineHeight: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
        }}
      >
        Coming soon...
      </Typography>
    </Box>
  );
};

export default Label;
