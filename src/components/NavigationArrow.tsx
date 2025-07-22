"use client";

import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from "@/theme/ThemeRegistry";

interface NavigationArrowProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

const NavigationArrow: React.FC<NavigationArrowProps> = ({
  direction,
  onClick,
  disabled,
}) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        left:
          direction === "left" ? { xs: "5px", sm: "20px", md: "40px" } : "auto",
        right:
          direction === "right"
            ? { xs: "5px", sm: "20px", md: "40px" }
            : "auto",
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          backgroundColor: disabled
            ? isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.12)"
            : isDark
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(255, 255, 255, 0.9)",
          color: disabled
            ? isDark
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(0, 0, 0, 0.26)"
            : isDark
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(0, 0, 0, 0.7)",
          border: "1px solid",
          borderColor: disabled
            ? isDark
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.12)"
            : isDark
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.23)",
          width: { xs: "36px", sm: "56px", md: "64px" },
          height: { xs: "36px", sm: "56px", md: "64px" },
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: disabled
              ? isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.12)"
              : isDark
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(255, 255, 255, 0.95)",
            transform: disabled ? "none" : "scale(1.05)",
            boxShadow: disabled
              ? "none"
              : isDark
              ? "0 4px 20px rgba(255, 255, 255, 0.1)"
              : "0 4px 20px rgba(0, 0, 0, 0.15)",
          },
          "&:active": {
            transform: disabled ? "none" : "scale(0.95)",
          },
        }}
      >
        <Icon
          sx={{
            fontSize: { xs: "18px", sm: "28px", md: "32px" },
            opacity: disabled ? 0.5 : isDark ? 0.8 : 1,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default NavigationArrow;
