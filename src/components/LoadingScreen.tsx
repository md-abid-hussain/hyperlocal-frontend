import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"rgba(255, 255, 255, 0.7)"}
    >
      <CircularProgress size={"5rem"} />
    </Box>
  );
};

export default LoadingScreen;
