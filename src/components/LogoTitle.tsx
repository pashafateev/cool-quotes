import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const LogoTitle = () => {
  const Logo = () => (
    <Box
      component="div"
      sx={{
        width: { xs: 80, sm: 100, md: 120, lg: 154 },
        height: { xs: 60, sm: 75, md: 90, lg: 114 },
        backgroundImage: "url('/logo-lm.svg')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 1, sm: 2 }}
      sx={{
        mt: { xs: 2, sm: 3, md: 4, lg: 5 },
        mb: { xs: 1, sm: 2, md: 3 },
        px: 2,
        width: "100%",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ flexWrap: "wrap" }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Arial Rounded MT Bold", Helvetica',
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3rem" },
            fontWeight: 400,
            letterSpacing: "-0.96px",
            lineHeight: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
              lg: "3.5rem",
            },
            color: "rgba(28, 30, 31, 1)",
            whiteSpace: "nowrap",
          }}
        >
          Cool
        </Typography>

        <Logo />

        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Arial Rounded MT Bold", Helvetica',
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3rem" },
            fontWeight: 400,
            letterSpacing: "-0.96px",
            lineHeight: {
              xs: "2.5rem",
              sm: "3rem",
              md: "3.5rem",
              lg: "3.5rem",
            },
            color: "rgba(28, 30, 31, 1)",
            whiteSpace: "nowrap",
          }}
        >
          Quotes
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          maxWidth: "780px",
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Plantagenet-Italic', Helvetica",
            fontStyle: "italic",
            color: "#1c1d1f",
            textAlign: { xs: "center", sm: "center" },
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            lineHeight: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Your invitation to a conversation through the ages.
        </Typography>
      </Box>
    </Stack>
  );
};

export default LogoTitle;
