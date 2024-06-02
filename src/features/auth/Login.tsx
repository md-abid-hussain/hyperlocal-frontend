import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
// MUI components import
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Radio from "@mui/material/Radio";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
// Component imports
import LoadingScreen from "../../components/LoadingScreen";
import Error from "../../components/Error";
import Copyright from "../../components/Copyright";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img4 from "../../assets/images/img4.jpg";
import FormControl from "@mui/material/FormControl";
// react hook form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const images = [img1, img2, img3, img4];
const randomImage = images[Math.floor(Math.random() * images.length)];

type LoginInput = {
  username: string;
  password: string;
  accountType: "user" | "helper";
};

const schema = yup.object().shape({
  username: yup.string().required("username or email is required"),
  password: yup.string().required("Password is required"),
  accountType: yup
    .string()
    .oneOf(["user", "helper"])
    .required("Account type is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(location.state?.error || "");
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    defaultValues: {
      username: "",
      password: "",
      accountType: "user",
    },
    resolver: yupResolver(schema),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleLogin: SubmitHandler<LoginInput> = async (data) => {
    try {
      const { accessToken } = (await login({
        username: data.username,
        password: data.password,
        isHelper: data.accountType === "helper",
      }).unwrap()) as { accessToken: string };

      dispatch(setCredentials({ accessToken }));
      navigate("/home");
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

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${randomImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && <Error errorMsg={error} />}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address or Username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/register">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
