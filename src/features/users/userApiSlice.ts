import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

export interface ILocation {
  type: string;
  coordinates: number[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  location?: ILocation;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userAdapter = createEntityAdapter({
  selectId: (user: IUser) => user._id,
});

const initialState = userAdapter.getInitialState();

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
        validateStatus: (response) => response.status === 200,
      }),
      transformResponse: (response: { users: IUser[] }) => {
        const userState = userAdapter.setAll(initialState, response.users);
        return userState;
      },
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
        validateStatus: (response) => response.status === 200,
        
      }),
      transformResponse: (response: { user: IUser }) => response.user,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "PATCH",
        body: { ...user },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export default userApiSlice;
export const {
  useGetAllUserQuery,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
