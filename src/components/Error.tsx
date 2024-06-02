import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

type ErrorProps = {
  errorMsg: string;
};

const Error = ({ errorMsg }: ErrorProps) => {
  return (
    <Alert severity="error" sx={{ position: "absolute", top: 10 }}>
      <Typography fontWeight={500}>{errorMsg}</Typography>
    </Alert>
  );
};

export default Error;
