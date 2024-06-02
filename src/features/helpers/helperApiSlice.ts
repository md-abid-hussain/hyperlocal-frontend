import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

interface ILocation {
  type: string;
  coordinates: number[];
}

interface IHelper {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  location: ILocation;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const helperAdapter = createEntityAdapter({
  selectId: (helper: IHelper) => helper._id,
});

const initialState = helperAdapter.getInitialState();

const helperApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHelper: builder.query({
      query: () => ({
        url: "/helpers",
        method: "GET",
        validateStatus: (response) => response.status === 200,
      }),
      transformResponse: (response: { helpers: IHelper[] }) => {
        const helperState = helperAdapter.setAll(initialState, response.helpers);
        return helperState;
      },
      providesTags: (result, error, id) => [{ type: "Helper", id }],
    }),
    getCurrentHelper: builder.query({
      query: () => ({
        url: "/helpers/me",
        method: "GET",
        validateStatus: (response) => response.status === 200,
        
      }),
      transformResponse: (response: { helper: IHelper }) => response.helper,
      providesTags: ["Helper"],
    }),
    updateHelper: builder.mutation({
      query: (helper) => ({
        url: "/helpers",
        method: "PATCH",
        body: { ...helper },
      }),
      invalidatesTags: ["Helper"],
    }),
    deleteHelper: builder.mutation({
      query: () => ({
        url: "/helpers",
        method: "DELETE",
      }),
      invalidatesTags: ["Helper"],
    }),
  }),
});

export default helperApiSlice;
export const {
  useGetAllHelperQuery,
  useGetCurrentHelperQuery,
  useUpdateHelperMutation,
  useDeleteHelperMutation,
} = helperApiSlice;
