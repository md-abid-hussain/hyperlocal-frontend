import { useGetTasksQuery } from "./taskApiSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetTasksQuery("taskList");

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isSuccess) {
    const { ids, entities } = data;
    const tasks = ids.map((id) => entities[id]);
    content = (
      <Box>
        {tasks.map((task) => (
          <Box key={task._id}>
            <Typography variant="h5" component="h3">
              {task.title}
            </Typography>
            <Link to={`/task/${task._id}`}>See more</Link>
          </Box>
        ))}
      </Box>
    );
  } else if (isError) {
    content = <div>Error: {JSON.stringify(error)}</div>;
  }

  return content;
};

export default TaskList;
