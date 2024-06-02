import { Paper, Typography } from "@mui/material";

type HelperProps = {
    name:string;
    email:string;
    username:string;
}

function Helper({name, email, username}:HelperProps) {
  return (
    <Paper sx={{padding:'1.5rem'}}>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="subtitle1">{email}</Typography>
      <Typography variant="subtitle2">{username}</Typography>
    </Paper>
  )
}

export default Helper