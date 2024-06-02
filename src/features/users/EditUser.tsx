import { useGetCurrentUserQuery } from "./userApiSlice";
import LoadingScreen from "../../components/LoadingScreen";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery("user");

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  }
  if (user) {
    content = <EditUserForm user={user} />;
  }

  return content;
};

export default EditUser;
