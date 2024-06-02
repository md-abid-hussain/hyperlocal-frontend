import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// components import
import Copyright from "../../components/Copyright";
import LoadingScreen from "../../components/LoadingScreen";
import Error from "../../components/Error";

// react router
import { Link, useNavigate } from "react-router-dom";

// redux
import { useRegisterMutation, useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

// react-hook-form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type RegisterInput = {
  name: string;
  username: string;
  email: string;
  password: string;
  accountType: "user" | "helper";
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password must contain a number"
    ),
  accountType: yup
    .string()
    .oneOf(["user", "helper"])
    .required("Account type is required"),
});

const Register = () => {
  const {
    register: registerForm,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      accountType: "user",
    },
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isSuccess, isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();

  useEffect(() => {
    const loginUser = async () => {
      if (isSuccess) {
        const { accessToken } = (await login({
          username: getValues("username"),
          password: getValues("password"),
          isHelper: getValues("accountType") === "helper",
        }).unwrap()) as { accessToken: string };
        dispatch(setCredentials({ accessToken }));
        navigate("/profile");
      }
    };

    loginUser();
  }, [isSuccess, login, navigate, dispatch, getValues]);

  const handleRegister: SubmitHandler<RegisterInput> = async (data) => {
    try {
      await register({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        isHelper: data.accountType === "helper",
      }).unwrap();
    } catch (err) {
      const error = err as { error: string; data: { message: string } };
      console.log(error);
      if ("error" in error) {
        setError(error.error);
      }
      if ("data" in error) {
        setError(error.data.message);
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                {...registerForm("name")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Username"
                {...registerForm("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                {...registerForm("email")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                {...registerForm("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl error={!!errors.accountType}>
                <FormLabel>Account Type:</FormLabel>
                <Controller
                  control={control}
                  name="accountType"
                  defaultValue="user"
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      <FormControlLabel
                        value="user"
                        control={<Radio />}
                        label="User"
                      />
                      <FormControlLabel
                        value="helper"
                        control={<Radio />}
                        label="Helper"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
        {error && <Error errorMsg={error} />}
      </Box>

      <Copyright />
    </Container>
  );
};

export default Register;
