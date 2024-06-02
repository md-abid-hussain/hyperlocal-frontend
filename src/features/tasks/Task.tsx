import { useGetTasksQuery } from "./taskApiSlice";
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useParams } from "react-router-dom";

const Task = () => {
  let { taskId } = useParams();
  taskId = taskId ? taskId : "undefined";
  const { task } = useGetTasksQuery("taskList", {
    selectFromResult: ({ data }) => ({
      task: data?.entities[taskId],
    }),
  });

  if (task) {
    return (
      <Box>
        <Typography variant="h3" component="h1">
          {task.title}
        </Typography>
        <Typography>{task.description}</Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Created On:{" "}
          </Typography>
          {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Status:{" "}
          </Typography>
          {task.status}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Budget:{" "}
          </Typography>
          {task.budget}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Category:{" "}
          </Typography>
          {task.category.name}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Location:{" "}
          </Typography>
          {task.location.coordinates.join(", ")}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Special Instructions:{" "}
          </Typography>
          {task.specialInstructions.join(", ")}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Owner:{" "}
          </Typography>
          {task.owner.name}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Assigned Helper:{" "}
          </Typography>
          {task.assignedHelper}
        </Typography>
        <Typography>
          <Typography component={"span"} fontWeight={500}>
            Applied Helpers:{" "}
          </Typography>
          {task.appliedHelpers.join(", ")}
        </Typography>
      </Box>
    );
  }
  return <div>Task not found</div>;
};

const memoizedTask = memo(Task);

export default memoizedTask;
