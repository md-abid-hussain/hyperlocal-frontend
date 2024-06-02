import { useGetCurrentUserQuery } from "./userApiSlice";
import User from "./User";
import LoadingScreen from "../../components/LoadingScreen";
import { Alert } from "@mui/material";
import { Close } from "@mui/icons-material";

function Profile() {
  const {
    data: user,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetCurrentUserQuery("user");

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  }

  if (isError) {
    console.log(error);
    content = (
      <Alert icon={<Close fontSize="inherit" />} severity="error">
        {JSON.stringify(error, null, 2)}
      </Alert>
    );
  }

  if (isSuccess) {
    content = <User user={user} />;
  }

  return content;
}

export default Profile;
