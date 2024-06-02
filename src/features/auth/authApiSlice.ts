import { apiSlice } from "../../app/api/apiSlice";
import { clearCredentials, setCredentials } from "./authSlice";

interface Credentials {
  username: string;
  password: string;
  isHelper: boolean;
}

type LoginSuccessResult = {
  accessToken: string;
};

type LoginErrorResult = {
  message: string;
  error: boolean;
};

type LoginResult = LoginSuccessResult | LoginErrorResult;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation<LoginResult, Credentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.error(err);
        }
      },
    }),
    refresh: builder.mutation<LoginResult, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled;
        dispatch(
          setCredentials({
            accessToken: (response.data as LoginSuccessResult).accessToken,
          })
        );
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
