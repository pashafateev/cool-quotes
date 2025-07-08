import { Box, Typography } from "@mui/material";
import React from "react";

const Label = () => {
  return (
    <Box sx={{ width: "904px", height: "64px" }}>
      <Typography
        variant="h2"
        sx={{
          width: "904px",
          fontFamily: "'Plantagenet-Regular', Helvetica",
          color: "#1c1d1f",
          fontSize: "3rem",
          textAlign: "center",
          letterSpacing: 0,
          lineHeight: "64px",
        }}
      >
        Coming soon...
      </Typography>
    </Box>
  );
};

export default Label;
