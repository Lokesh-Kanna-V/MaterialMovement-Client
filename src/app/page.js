"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { postRequest } from "@/connection/httpRequest";

import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function Login() {
  let router = useRouter();

  let [submit, setSubmit] = useState(false);
  let [submitStatus, setSubmitStatus] = useState({
    color: "primary",
    message: "Login",
  });

  // MUI Code - START
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // MUI Code - END

  useEffect(() => {
    setTimeout(() => {
      setSubmitStatus({
        color: "primary",
        message: "Login",
      });
    }, 3000);
  }, [submit]);

  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmit(true);

    let endPoint = "/login";
    let payload = data;
    let result = await postRequest(endPoint, payload);

    if (result.data) {
      setSubmit(false);
      setSubmitStatus({
        color: "success",
        message: "Logging In",
      });
      router.push("/home");
    } else if (result.message) {
      setSubmit(false);
      if (result.message == "Request failed with status code 403") {
        setSubmitStatus({
          color: "error",
          message: "Email or Password is incorrect",
        });
      } else {
        setSubmitStatus({ color: "error", message: error.message });
      }
    }
  };

  return (
    <main className="container mx-auto h-screen w-full flex flex-col justify-center items-center sm:flex-col md:flex-row">
      <section className="px-5 py-20 flex flex-col gap-10 md:p-20 md:border-4">
        <div>
          <Typography variant="h4">Hello User,</Typography>
          <Typography variant="h5">Welcome to WMS Login Page</Typography>
        </div>
        <form
          className="w-2/10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="email"
            className="w-full"
            label="Email"
            variant="outlined"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-crtpassword">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-crtpassword"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              label="Create a Password"
            />
            {errors.password ? (
              <FormHelperText error>Password doesn't match</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>

          {submit ? (
            <Button variant="text">
              <CircularProgress />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              startIcon={
                submitStatus.color === "success" ? (
                  <DoneIcon />
                ) : submitStatus.color === "error" ? (
                  <CloseIcon />
                ) : null
              }
              color={submitStatus.color}
            >
              {submitStatus.message}
            </Button>
          )}

          <div className="w-full flex flex-col justify-center items-center">
            <Typography>
              Don't Have an Account?{" "}
              <span>
                <Button variant="text" onClick={() => router.push("/signup")}>
                  Sign Up
                </Button>
              </span>
            </Typography>
          </div>
        </form>
      </section>
    </main>
  );
}
