import { Typography, Box, useTheme } from "@mui/material";
import CustomDrawer from "./Drawer/CustomDrawer";

function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingY: "1rem",
        paddingX: "0.5rem",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <CustomDrawer />
        <Typography
          variant="h4"
          component="h1"
          color="whitesmoke"
          fontWeight={700}
        >
          Hyperlocal
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
