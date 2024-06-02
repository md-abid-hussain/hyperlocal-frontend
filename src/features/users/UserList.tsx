import { useGetAllUserQuery } from "./userApiSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Alert, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import User from "./User";

function UserList() {
  const { data, isError, error, isLoading, isSuccess } = useGetAllUserQuery(
    "userList",
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      pollingInterval: 60000,
    }
  );

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    console.log(error);
    content = (
      <Alert icon={<Close fontSize="inherit" />} severity="error">
        {JSON.stringify(error, null, 2)}
      </Alert>
    );
  } else if (isSuccess) {
    const { ids, entities } = data;
    content = (
      <Box gap={"1rem"}>
        {ids.map((id) => {
          const user = entities[id];
          return <User key={id} user={user} />;
        })}
      </Box>
    );
  }

  return content;
}

export default UserList;
