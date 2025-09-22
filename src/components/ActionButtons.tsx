import { Box, Button } from "@mui/material";
import { FormatQuote, RestartAlt } from "@mui/icons-material";

interface ActionButtonsProps {
  onStartOver: () => void;
}

export default function ActionButtons({ onStartOver }: ActionButtonsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, sm: 2 }, // Smaller gap on mobile
        marginTop: 4,
        flexDirection: "row", // Horizontal layout on all screen sizes
        alignItems: "center",
        justifyContent: "center", // Center the buttons horizontally
        width: "100%",
        maxWidth: { xs: "none", sm: "none" }, // No width limit on mobile
      }}
    >
      <Button
        variant="contained"
        color="success"
        startIcon={<RestartAlt />}
        onClick={onStartOver}
        size="small" // Smaller size for mobile
        sx={{
          width: "auto", // Auto width on all screens - just fit the content
          minHeight: { xs: "32px", sm: "36px" }, // Slightly taller on mobile for better touch
          fontSize: { xs: "0.7rem", sm: "0.9375rem" }, // Slightly larger text on mobile
          padding: { xs: "4px 12px", sm: "8px 22px" }, // Better padding on mobile
          "&:hover": {
            backgroundColor: "#A8E889", // Darker green on hover
            transform: "translateY(-2px)", // Lift effect
            boxShadow: "0 4px 12px rgba(168, 232, 137, 0.4)", // Glowing shadow
          },
          transition: "all 0.2s ease-in-out", // Smooth transition
        }}
      >
        Start Over
      </Button>
      <Button
        variant="contained"
        startIcon={<FormatQuote />}
        onClick={() =>
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSdrjwZVG1aCAqEU4mJwtqaEsjMB0yYu3c7QUVZHhsnD5FF-_w/viewform?vc=0&c=0&w=1&flr=0",
            "_blank"
          )
        }
        size="small" // Smaller size for mobile
        sx={{
          width: "auto", // Auto width on all screens - just fit the content
          minHeight: { xs: "32px", sm: "36px" }, // Slightly taller on mobile for better touch
          fontSize: { xs: "0.7rem", sm: "0.9375rem" }, // Slightly larger text on mobile
          padding: { xs: "4px 12px", sm: "8px 22px" }, // Better padding on mobile
          "&:hover": {
            backgroundColor: "#1C1E1F", // Darker on hover for primary button
            transform: "translateY(-2px)", // Lift effect
            boxShadow: "0 4px 12px rgba(28, 30, 31, 0.4)", // Glowing shadow
          },
          transition: "all 0.2s ease-in-out", // Smooth transition
        }}
      >
        Contribute
      </Button>
    </Box>
  );
}
