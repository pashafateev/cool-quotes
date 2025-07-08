import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const LogoTitle = () => {
  const Logo = () => (
    <Box
      component="div"
      sx={{
        width: 154,
        height: 114,
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
      spacing={2}
      sx={{
        mt: 5,
        mb: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Arial Rounded MT Bold", Helvetica',
            fontSize: "48px",
            fontWeight: 400,
            letterSpacing: "-0.96px",
            lineHeight: "56px",
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
            fontSize: "48px",
            fontWeight: 400,
            letterSpacing: "-0.96px",
            lineHeight: "56px",
            color: "rgba(28, 30, 31, 1)",
            whiteSpace: "nowrap",
          }}
        >
          Quotes
        </Typography>
      </Stack>

      <Box width={780} height={48}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Plantagenet-Italic', Helvetica",
            fontStyle: "italic",
            color: "#1c1d1f",
            textAlign: "right",
            lineHeight: "48px",
            whiteSpace: "nowrap",
          }}
        >
          Your invitation to a conversation through the ages.
        </Typography>
      </Box>
    </Stack>
  );
};

export default LogoTitle;
