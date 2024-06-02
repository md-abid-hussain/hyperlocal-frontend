import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

type LocationType = {
  _id: string;
  type: string;
  coordinates: number[];
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  category: TaskCategoryType;
  location: LocationType;
  status: string;
  specialInstructions: string[];
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  budget: number;
  appliedHelpers: string[];
  assignedHelper: string;
  createdAt: string;
  updatedAt: string;
};

type TaskCategoryType = {
  _id: string;
  name: string;
};

const taskAdapter = createEntityAdapter({
  selectId: (task: Task) => task._id,
});

const initialState = taskAdapter.getInitialState();

const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: "/tasks",
        method: "GET",
        validateStatus: (response) => response.status === 200,
      }),
      transformResponse: (response: { tasks: Task[] }) => {
        const taskState = taskAdapter.setAll(initialState, response.tasks);
        return taskState;
      },
      providesTags: (result, error, id) => [{ type: "Task", id }],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: { ...task },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "PATCH",
        body: { ...task },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    deleteTask: builder.mutation({
      query: (taskId: string) => ({
        url: `/tasks`,
        method: "DELETE",
        body: { taskId },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    applyForTask: builder.mutation({
      query: (taskId: string) => ({
        url: `/tasks/apply`,
        method: "PATCH",
        body: { taskId },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    cancelApplication: builder.mutation({
      query: (taskId: string) => ({
        url: `/tasks/apply`,
        method: "DELETE",
        body: { taskId },
      }),
      invalidatesTags: [{ type: "Task", id: "LIST" }],
    }),
    getTaskCategories: builder.query({
      query: () => ({
        url: "/tasks/categories",
        method: "GET",
        validateStatus: (response) => response.status === 200,
      }),
      providesTags: ["TaskCategory"],
      transformResponse: (response: { categories: TaskCategoryType[] }) =>
        response.categories,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskCategoriesQuery,
} = taskApiSlice;
