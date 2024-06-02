import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { AuthState } from "../../features/auth/authSlice";
import { setCredentials } from "../../features/auth/authSlice";

interface RootState {
  auth: AuthState;
}

interface RefreshSuccessResult {
  accessToken: string;
}

interface RefreshErrorResult {
  message: string;
  error: boolean;
  context?: Record<string, string | number | string[]>; // Replace 'any' with the actual type of 'context' if known
}

type RefreshResult =
  | { data: RefreshSuccessResult }
  | { error: RefreshErrorResult };

type Args = string | FetchArgs;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: Args,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = (await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    )) as RefreshResult;
    if ("data" in refreshResult) {
      const newToken = refreshResult.data.accessToken;
      api.dispatch(setCredentials({ accessToken: newToken }));

      // re-run the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.error("Failed to refresh token", refreshResult.error);
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["User", "Task", "Helper", "TaskCategory"],
  endpoints: () => ({}),
});
