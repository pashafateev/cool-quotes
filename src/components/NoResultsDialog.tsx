import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { RestartAlt, FormatQuote } from "@mui/icons-material";

interface NoResultsDialogProps {
  open: boolean;
  onClose: () => void;
  onStartOver: () => void;
  onContribute: () => void;
  searchTerm: string;
}

export default function NoResultsDialog({
  open,
  onClose,
  onStartOver,
  onContribute,
  searchTerm,
}: NoResultsDialogProps) {
  const handleStartOver = () => {
    onStartOver();
    onClose();
  };

  const handleContribute = () => {
    onContribute();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            padding: 1,
          },
        },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          component="div"
          textAlign="center"
          sx={{
            fontFamily: "'Plantagenet-Regular', Helvetica",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
          }}
        >
          No quotes found for "{searchTerm}"
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            mb: 2,
            fontFamily: "'Plantagenet-Regular', Helvetica",
            fontSize: { xs: "1rem", sm: "1.125rem" },
            lineHeight: 1.5,
          }}
        >
          We couldn't find any quotes related to "{searchTerm}". Would you like
          to explore a fresh quote, or help us grow our collection by sharing
          your own wisdom?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<RestartAlt />}
          onClick={handleStartOver}
          sx={{
            fontFamily: "'Plantagenet-Regular', Helvetica",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: "#A8E889",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(168, 232, 137, 0.4)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Join a new thread
        </Button>
        <Button
          variant="contained"
          startIcon={<FormatQuote />}
          onClick={handleContribute}
          sx={{
            fontFamily: "'Plantagenet-Regular', Helvetica",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            "&:hover": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(0, 0, 0, 0.6)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Suggest a response
        </Button>
      </DialogActions>
    </Dialog>
  );
}
