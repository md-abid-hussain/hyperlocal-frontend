import { Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";

const Public = () => {
  return (
    <Box>
      <Header />
      <Grid
        container
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item>
          <Typography
            variant="h2"
            component="h2"
            fontWeight={700}
            textAlign={"center"}
          >
            Hyperlocal
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={500}
            textAlign={"center"}
          >
            Welcome to Hyperlocal!
          </Typography>
          <Typography variant="h6" component="h3" textAlign={"center"}>
            Please <Link to="/login">login</Link> to continue
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Public;
