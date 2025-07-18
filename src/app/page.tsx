"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Box, CircularProgress, Typography } from "@mui/material";
import Card from "@/components/Card";
import { useQuoteManager } from "@/hooks/useQuoteManager";
import { getColorByHash } from "@/utils/colorUtils";
import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";

// Client-only wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

function QuoteList() {
  const { currentQuotes, handleWordClick } = useQuoteManager();
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <Box
      component="main"
      ref={container}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentQuotes.map((quote, i) => {
        const targetScale = 1 - (currentQuotes.length - i) * 0.05;

        return (
          <Card
            key={`quote_${i}`}
            q={quote}
            onWordClick={handleWordClick}
            color={getColorByHash(quote.id)}
            i={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </Box>
  );
}

export default function Home() {
  const { currentQuotes, loading, error, handleWordClick } = useQuoteManager();

  if (loading) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
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
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
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
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <ClientOnly>
        <QuoteList />
      </ClientOnly>
      <Footer />
    </Box>
  );
}
