import { IUser } from "./userApiSlice";
import { useState, useEffect } from "react";
import { useUpdateUserMutation } from "./userApiSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, Divider } from "@mui/material";
import { Close } from "@mui/icons-material";
import LoadingScreen from "../../components/LoadingScreen";

type EditUserFormProps = {
  user: IUser;
};

const EditUserForm = ({ user }: EditUserFormProps) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [longitude, setLongitude] = useState(
    user.location?.coordinates[0] || 0
  );
  const [latitude, setLatitude] = useState(user.location?.coordinates[1] || 0);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setName(user.name);
    setLongitude(user.location?.coordinates[0] || 0);
    setLatitude(user.location?.coordinates[1] || 0);
  }, [user]);

  const [updateUser, { isSuccess, isLoading }] = useUpdateUserMutation();

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  }

  if (isSuccess) {
    content = (
      <Alert icon={<Close fontSize="inherit" />} severity="success">
        User updated successfully
      </Alert>
    );
  }

  const handleSubmit = async () => {
    await updateUser({
      name,
      email,
      username,
      latitude,
      longitude,
    }).unwrap();
  };

  const handlePasswordChange = async () => {
    console.log(newPassword, oldPassword);
    await updateUser({
      newPassword,
      oldPassword,
    }).unwrap();
  };

  const handleDeactivateAccount = async () => {
    await updateUser({
      isActive: false,
    }).unwrap();
  };

  return (
    <Box
      component="form"
      maxWidth={400}
      display={"flex"}
      flexDirection={"column"}
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
    >
      <Typography variant="h5">Edit User</Typography>
      <TextField
        required
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        id="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        required
        id="latitude"
        label="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(parseFloat(e.target.value))}
      />
      <TextField
        required
        id="longitude"
        label="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(parseFloat(e.target.value))}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
      <Divider />
      <Typography variant="h5">Change Password</Typography>
      <TextField
        required
        id="oldPassword"
        label="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        required
        id="newPassword"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handlePasswordChange}>
        Change Password
      </Button>

      <Divider />
      <Typography variant="h5">Deactivate Account</Typography>
      <Button variant="contained" onClick={handleDeactivateAccount} color="warning">
        Deactivate Account
      </Button>
      {content}
    </Box>
  );
};

export default EditUserForm;
