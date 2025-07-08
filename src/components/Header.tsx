import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LogoTitle from "./LogoTitle";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "0.5px solid",
        borderColor: "text.primary",
      }}
    >
      <LogoTitle />
    </Box>
  );
};

export default Header;
