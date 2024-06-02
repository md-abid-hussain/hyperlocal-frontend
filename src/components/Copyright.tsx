import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={5}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Hyperlocal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
