import { Box } from "@mui/material";
import React from "react";

const QuotationMark = () => {
  return (
    <Box
      sx={{
        width: { xs: "40px", sm: "50px", md: "62px" },
        height: { xs: "27px", sm: "34px", md: "42px" },
        backgroundImage: "url(/quotation-mark.svg)",
        backgroundSize: "100% 100%",
      }}
    />
  );
};

export default QuotationMark;
