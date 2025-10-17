import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import { useTheme } from "@/theme/ThemeRegistry";

const Footer = () => {
  const themeContext = useTheme();

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
        marginTop: "auto", // This pushes it to the bottom
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: { xs: 2, sm: 0 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Link
          href="https://pashafateev.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "secondary.main",
              fontSize: { xs: "12px", sm: "14px" },
              fontWeight: 400,
              letterSpacing: "-0.32px",
              lineHeight: "18px",
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Web Development by Pasha
          </Typography>
        </Link>

        <Typography
          variant="h6"
          sx={{
            color: "text.primary",
            fontSize: { xs: "12px", sm: "14px" },
            fontWeight: 400,
            letterSpacing: "-0.32px",
            lineHeight: "18px",
            textAlign: { xs: "center", sm: "center" },
          }}
        >
          © 2025{" "}
          <Link
            href="https://proctorcharlie.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              component="span"
              sx={{
                color: "secondary.main",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              The Proctor Charlie Collective
            </Typography>
          </Link>
          .
          <br />
          Other copyrights may apply.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 0 },
          }}
        >
          <Link
            href="https://studiosigne.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 0 },
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "secondary.main",
                  fontSize: { xs: "12px", sm: "14px" },
                  fontWeight: 400,
                  letterSpacing: "-0.32px",
                  lineHeight: "18px",
                  textAlign: { xs: "center", sm: "right" },
                  marginRight: { xs: 0, sm: "16px" },
                  display: { xs: "none", sm: "block" },
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Web Design by
              </Typography>
              <Box
                component="img"
                sx={{
                  width: { xs: "50px", sm: "70px" },
                  height: { xs: "45px", sm: "63px" },
                  objectFit: "cover",
                  display: { xs: "none", sm: "block" },
                }}
                alt="Studio Signe logo"
                src={
                  themeContext.isDark
                    ? "/signe-logo-dm.png"
                    : "/signe-logo-lm.png"
                }
              />
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
