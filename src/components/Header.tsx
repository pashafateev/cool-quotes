"use client";

import { Box } from "@mui/material";
import React from "react";
import LogoTitle from "./LogoTitle";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "0.5px solid",
        borderColor: "text.primary",
        position: "relative",
      }}
    >
      <LogoTitle />

      {/* Theme toggle positioned in top-right corner */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 8, sm: 12 },
          right: { xs: 8, sm: 16 },
          zIndex: 10,
        }}
      >
        <ThemeToggle />
      </Box>
    </Box>
  );
};

export default Header;
