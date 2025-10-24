import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import { Close } from "@mui/icons-material";

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
        <Box sx={{ position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: -8,
              top: -8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            textAlign="center"
            sx={{
              fontFamily: "'Plantagenet-Regular', Helvetica",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              pr: 4, // Add padding to avoid overlap with close button
            }}
          >
            No quotes found for &ldquo;
            <Box component="span" sx={{ fontStyle: "italic" }}>
              {searchTerm}
            </Box>
            &rdquo;
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 3 }}>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            fontFamily: "'Plantagenet-Regular', Helvetica",
            fontSize: { xs: "1rem", sm: "1.125rem" },
            lineHeight: 1.6,
            color: "text.primary",
          }}
        >
          <Link
            component="button"
            onClick={handleStartOver}
            underline="none"
            sx={{
              color: "secondary.main",
              cursor: "pointer",
              fontFamily: "'Plantagenet-Regular', Helvetica",
              fontSize: "inherit",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
              display: "inline-block",
              "&:hover": {
                transform: "scale(1.02)",
                textShadow: "0 0 8px rgba(61, 173, 255, 0.3)",
              },
            }}
          >
            Start a new conversation
          </Link>
          , or help us grow Cool Quotes by{" "}
          <Link
            component="button"
            onClick={handleContribute}
            underline="none"
            sx={{
              color: "secondary.main",
              cursor: "pointer",
              fontFamily: "'Plantagenet-Regular', Helvetica",
              fontSize: "inherit",
              fontWeight: 500,
              transition: "all 0.2s ease-in-out",
              display: "inline-block",
              "&:hover": {
                transform: "scale(1.02)",
                textShadow: "0 0 8px rgba(61, 173, 255, 0.3)",
              },
            }}
          >
            sharing a quote yourself
          </Link>
          !
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
