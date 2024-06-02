import { Divider, Paper, Typography } from "@mui/material";
import { useGetTasksQuery } from "../tasks/taskApiSlice";

import { IUser } from "./userApiSlice";

type UserProps = {
  user:IUser
};

const User = ({user }: UserProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetTasksQuery({});

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  if (isSuccess) {
    const { ids, entities } = tasks;
    content = ids.map((id) => {
      const task = entities[id];
      return (
        <div key={task._id}>
          <Typography variant="subtitle1">{task.title}</Typography>
          <Typography variant="subtitle2">{task.description}</Typography>
          <Typography variant="subtitle2">{new Date(task.createdAt).toLocaleDateString()}</Typography>
          <Typography variant="subtitle2">{new Date(task.updatedAt).toLocaleDateString()}</Typography>
        </div>
      );
    });
  }

  return (
    <Paper sx={{ padding: "1.5rem" }}>
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="h6">{user._id}</Typography>
      <Typography variant="subtitle1">{user.email}</Typography>
      <Typography variant="subtitle2">{user.username}</Typography>

      <Divider sx={{ margin: "1rem 0" }} />
      <Typography variant="h6">Tasks</Typography>
      {content}
    </Paper>
  );
};

export default User;
