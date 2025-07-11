import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        minHeight: { xs: "auto", sm: "148px" },
        bgcolor: "background.paper",
        borderTop: "0.5px solid",
        borderColor: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 2, sm: 0 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 2, sm: 0 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "primary.main",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 400,
            letterSpacing: "-0.32px",
            lineHeight: "20px",
            display: { xs: "none", sm: "block" },
          }}
        >
          Web Development by Pasha
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 400,
            letterSpacing: "-0.32px",
            lineHeight: "20px",
            textAlign: { xs: "center", sm: "center" },
          }}
        >
          © 2025 The Proctor Charlie Collective.
          <br />
          Other copyrights may apply.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 400,
              letterSpacing: "-0.32px",
              lineHeight: "20px",
              textAlign: { xs: "center", sm: "right" },
              marginRight: { xs: 0, sm: "16px" },
              display: { xs: "none", sm: "block" },
            }}
          >
            Web Design by
          </Typography>
          <Box
            component="img"
            sx={{
              width: { xs: "60px", sm: "80px" },
              height: { xs: "54px", sm: "72px" },
              objectFit: "cover",
              display: { xs: "none", sm: "block" },
            }}
            alt="Studio Signe logo"
            src="/signe-logo.png"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
