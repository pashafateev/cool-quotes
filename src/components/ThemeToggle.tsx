"use client";

import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  SettingsBrightness,
  Palette,
} from "@mui/icons-material";
import { useTheme } from "@/theme/ThemeRegistry";

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Always call useTheme to maintain hook order
  const themeContext = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newMode: "light" | "dark" | "system") => {
    // Only call setMode if it's a real function (not the fallback no-op)
    if (themeContext.setMode && typeof themeContext.setMode === "function") {
      themeContext.setMode(newMode);
    }
    handleClose();
  };

  const getCurrentIcon = () => {
    if (!mounted) {
      return <Palette />;
    }

    switch (themeContext.mode) {
      case "light":
        return <LightMode />;
      case "dark":
        return <DarkMode />;
      case "system":
        return <SettingsBrightness />;
      default:
        return <Palette />;
    }
  };

  const getCurrentTooltip = () => {
    if (!mounted) {
      return "Theme settings";
    }

    switch (themeContext.mode) {
      case "light":
        return "Light mode (switch to dark)";
      case "dark":
        return "Dark mode (switch to light)";
      case "system":
        return `System mode (currently ${
          themeContext.isDark ? "dark" : "light"
        })`;
      default:
        return "Theme settings";
    }
  };

  const open = Boolean(anchorEl);
  const currentMode = themeContext.mode;

  return (
    <>
      <Tooltip title={getCurrentTooltip()}>
        <IconButton
          onClick={handleClick}
          sx={{
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          {getCurrentIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => handleThemeChange("light")}
          selected={currentMode === "light"}
        >
          <ListItemIcon>
            <LightMode />
          </ListItemIcon>
          <ListItemText>Light</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange("dark")}
          selected={currentMode === "dark"}
        >
          <ListItemIcon>
            <DarkMode />
          </ListItemIcon>
          <ListItemText>Dark</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => handleThemeChange("system")}
          selected={currentMode === "system"}
        >
          <ListItemIcon>
            <SettingsBrightness />
          </ListItemIcon>
          <ListItemText>
            System{" "}
            {currentMode === "system" &&
              themeContext &&
              `(${themeContext.isDark ? "Dark" : "Light"})`}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;
