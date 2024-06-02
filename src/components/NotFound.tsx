import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Box textAlign={'center'} sx={{
      display:'grid',
      placeContent:'center',
      minHeight:'100vh',
    }}>
      <Typography variant="h1" fontWeight={900}>
        404: Page not found
      </Typography>
      <Typography variant="h5">Sorry, the page you are looking for does not exist.</Typography>
      <Link to="/" replace>Go back to the homepage</Link>
    </Box>
  );
};

export default NotFound;
