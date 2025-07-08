import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                width: "100%",
                minHeight: 246, // or just remove this line
                bgcolor: "background.paper",
                borderBottom: "0.5px solid",
                borderColor: "text.primary",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    pt: 10,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: "header-1",
                            color: "text.primary",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Cool
                    </Typography>

                    <Box
                        component="img"
                        src="/logo-lm.svg"
                        alt="Cool Quotes Logo"
                        sx={{
                            width: 154,
                            height: 114,
                        }}
                    />

                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: "header-1",
                            color: "text.primary",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Quotes
                    </Typography>
                </Box>

                <Typography
                    variant="h3"
                    sx={{
                        fontFamily: "subheader",
                        fontStyle: "italic",
                        color: "text.primary",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                    }}
                >
                    Your invitation to a conversation through the ages.
                </Typography>
            </Container>
        </Box>
    );
};

export default Header;