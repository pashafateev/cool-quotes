import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                height: "148px",
                bgcolor: "background.paper",
                borderTop: "0.5px solid",
                borderColor: "text.primary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "primary.main",
                        fontSize: "16px",
                        fontWeight: 400,
                        letterSpacing: "-0.32px",
                        lineHeight: "20px",
                        textAlign: "center",
                    }}
                >
                    Web Development by Pasha
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: "text.primary",
                        fontSize: "16px",
                        fontWeight: 400,
                        letterSpacing: "-0.32px",
                        lineHeight: "20px",
                        textAlign: "center",
                    }}
                >
                    © 2025 The Proctor Charlie Collective.
                    <br />
                    Other copyrights may apply.
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "primary.main",
                            fontSize: "16px",
                            fontWeight: 400,
                            letterSpacing: "-0.32px",
                            lineHeight: "20px",
                            textAlign: "right",
                            marginRight: "16px",
                        }}
                    >
                        Web Design by
                    </Typography>
                    <Box
                        component="img"
                        sx={{
                            width: "80px",
                            height: "72px",
                            objectFit: "cover",
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
