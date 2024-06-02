import {
  useCreateTaskMutation,
  useGetTaskCategoriesQuery,
} from "./taskApiSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState<number | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetTaskCategoriesQuery("taskCategories");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createTask({
        title,
        description,
        category,
        budget,
        specialInstructions,
        latitude: 89,
        longitude: 45,
      }).unwrap();
      console.log("Result: ", result);
      navigate(`/task/${result.task._id}`);
    } catch (err) {
      console.error("Failed to create task: ", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display={"flex"}
      flexDirection={"column"}
      maxWidth={400}
      gap="1rem"
    >
      <Typography variant="h3" component="h1">
        Create Task
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <FormControl>
        <InputLabel id="category">Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isCategoriesLoading}
          label="Category"
          id="category"
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Budget"
        type="number"
        value={budget === null ? "" : budget}
        onChange={(e) => {
          setBudget(e.target.value === "" ? null : Number(e.target.value));
        }}
      />
      <TextField
        label="Special Instructions"
        value={specialInstructions}
        onChange={(e) => setSpecialInstructions(e.target.value.split(","))}
      />

      <Button type="submit" disabled={isLoading}>
        Create Task
      </Button>
    </Box>
  );
};

export default CreateTask;
