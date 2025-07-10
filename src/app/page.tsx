"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";
import Quote from "@/components/Quote";

export default function Home() {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Quote quote="This is a quote from the database in the font Plantagenet." />
      </Box>
      <Footer />
    </Box>
  );
}
