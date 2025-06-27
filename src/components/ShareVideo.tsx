import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";

import {
  Send,
  Facebook,
  Twitter,
  MessageCircle,
  Linkedin,
  Copy,
  X,
} from "lucide-react";

interface ShareVideoDialogProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string | "";
}

const ShareVideoDialog: React.FC<ShareVideoDialogProps> = ({
  open,
  onClose,
  videoUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);
      setCopied(true);
      setShowSnackbar(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(videoUrl);
    const text = encodeURIComponent("Check out this awesome video!");

    const shareUrls = {
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(
      shareUrls[platform as keyof typeof shareUrls],
      "_blank",
      "width=600,height=400"
    );
  };

  const socialIcons = [
    { icon: Send, color: "#0088cc", platform: "telegram", label: "Telegram" },
    {
      icon: Facebook,
      color: "#1877f2",
      platform: "facebook",
      label: "Facebook",
    },
    { icon: Twitter, color: "#1da1f2", platform: "twitter", label: "Twitter" },
    {
      icon: MessageCircle,
      color: "#25d366",
      platform: "whatsapp",
      label: "WhatsApp",
    },
    {
      icon: Linkedin,
      color: "#0077b5",
      platform: "linkedin",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow:
              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              color: "#1f2937",
              fontSize: "1.25rem",
            }}
          >
            Share Video
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: "#6b7280",
              "&:hover": {
                backgroundColor: "#f9fafb",
              },
            }}
          >
            <X />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3, pb: 3 }}>
          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              my: 4,
            }}
          >
            {socialIcons.map(({ icon: Icon, color, platform, label }) => (
              <IconButton
                key={platform}
                onClick={() => handleSocialShare(platform)}
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: color,
                  color: "white",
                  "&:hover": {
                    backgroundColor: color,
                    opacity: 0.9,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                aria-label={`Share on ${label}`}
              >
                <Icon size={24} />
              </IconButton>
            ))}
          </Box>

          {/* URL Copy Section */}
          <Box
            sx={{
              backgroundColor: "white",
              border: "2px solid #e5e7eb",
              borderRadius: 2,
              p: 2,
              boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "stretch" }}>
              <TextField
                fullWidth
                value={videoUrl}
                variant="outlined"
                size="medium"
                InputProps={{
                  readOnly: true,
                  sx: {
                    backgroundColor: "white",
                    "& .MuiOutlinedInput-input": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9ca3af",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3b82f6",
                      borderWidth: 2,
                    },
                  },
                }}
                onClick={handleCopyUrl}
              />
              <Button
                onClick={handleCopyUrl}
                variant="contained"
                sx={{
                  minWidth: 100,
                  backgroundColor: copied ? "#10b981" : "#3b82f6",
                  color: "white",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1.5,
                  "&:hover": {
                    backgroundColor: copied ? "#059669" : "#2563eb",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                startIcon={<Copy size={18} />}
              >
                <Fade in={!copied} timeout={200}>
                  <span
                    style={{
                      position: copied ? "absolute" : "static",
                      opacity: copied ? 0 : 1,
                    }}
                  >
                    Copy
                  </span>
                </Fade>
                <Fade in={copied} timeout={200}>
                  <span
                    style={{
                      position: !copied ? "absolute" : "static",
                      opacity: !copied ? 0 : 1,
                    }}
                  >
                    Copied!
                  </span>
                </Fade>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          URL copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareVideoDialog;
