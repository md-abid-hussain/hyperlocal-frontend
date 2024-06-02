import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import LoadingScreen from "../../components/LoadingScreen";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || !import.meta.env.DEV) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content;

  if (isLoading) {
    content = <LoadingScreen />;
  } else if (isError) {
    console.log(error);
    return (
      <Navigate to="/login" state={{ error: "Please login again" }} replace />
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
