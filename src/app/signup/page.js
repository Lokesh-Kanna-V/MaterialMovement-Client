"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { postRequest } from "@/connection/httpRequest";

import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import Stack from "@mui/material/Stack";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function SignUp() {
  let serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let router = useRouter();

  let [alert, setAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState();
  let [alertSeverity, setAlertSeverity] = useState();
  let [submit, setSubmit] = useState(false);
  let [submitStatus, setSubmitStatus] = useState({
    color: "primary",
    message: "Submit",
  });

  let [pwdConfirm, setPwdConfirm] = useState(true);

  function alertMsg(errData) {
    let message = errData.message;
    let severity = errData.severity;
    setAlert(true);
    setAlertMessage(message);
    setAlertSeverity(severity);

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }

  useEffect(() => {
    setTimeout(() => {
      setSubmitStatus({
        color: "primary",
        message: "Login",
      });
    }, 3000);
  }, [submit]);

  function handlePasswordConformation() {
    setPwdConfirm(false);

    setTimeout(() => {
      setPwdConfirm("");
    }, 3000);
  }

  // React-Hook-Form - START
  const {
    register,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmit(true);

    if (data.password === data.confirmPassword) {
      let endPoint = "/signup";
      let payload = data;
      let result = await postRequest(endPoint, payload);

      if (result.status == 200 && result.data) {
        setSubmit(false);
        setSubmitStatus({
          color: "success",
          message: "User Created",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else if (result.message) {
        setSubmit(false);
        setSubmitStatus({
          color: "error",
          message: result.message,
        });
      } else {
        setSubmit(false);
        setSubmitStatus({
          color: "error",
          message: "Something Went Wrong",
        });
      }
    } else {
      handlePasswordConformation();
    }
  };
  // React-Hook-Form - END

  // MUI - START
  // Create Passowrd
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Confirm Password
  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);
  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };
  // MUI - END

  return (
    <main className="container mx-auto h-screen w-full flex flex-col justify-center items-center sm:flex-col md:flex-row">
      <section className="px-5 py-20 flex flex-col gap-10 md:p-20 md:border-4">
        <div>
          <Typography variant="h4">Welcome to WM Software,</Typography>
          <Typography variant="h5">
            Please fill in the details to signup
          </Typography>
        </div>
        <form
          className="w-2/10 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="fname"
            className="w-full"
            label="First Name"
            variant="outlined"
            {...register("fname", { required: "First Name is required" })}
            error={!!errors.fname}
            helperText={errors.fname?.message}
          />
          <TextField
            id="lname"
            className="w-full"
            label="Last Name"
            variant="outlined"
            {...register("lname")}
          />
          <TextField
            id="phone"
            className="w-full"
            label="Phone Number"
            variant="outlined"
            type="tel"
            {...register("phone", {
              // valueAsNumber: true,
              pattern: {
                value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                message: "Invalid Phone Number",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            id="email"
            className="w-full"
            label="Email"
            variant="outlined"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(?!.*\.{2})(?!\.)[a-z0-9_.'-]*[a-z0-9_'-]@(?!_)(?:[a-z0-9_'-]+\.)+[a-z0-9_'-]{2,}$/i,
                message: "Invalid Email Address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-crtpassword">
              Create a Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-crtpassword"
              type={showCPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowCPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showCPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              label="Create a Password"
            />
            {pwdConfirm == false ? (
              <FormHelperText error>Password doesn't match</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
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
              {...register("confirmPassword", {
                required: "Please Confirm Password",
              })}
              error={!!errors.confirmPassword}
              label="Confirm Password"
            />
            {pwdConfirm == false ? (
              <FormHelperText error>Password doesn't match</FormHelperText>
            ) : (
              <></>
            )}
          </FormControl>

          {alert ? (
            <Alert severity={alertSeverity} style={{ marginTop: "10px" }}>
              {alertMessage}
            </Alert>
          ) : (
            <></>
          )}
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "space-around" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
            >
              Back
            </Button>
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
          </Stack>
        </form>
      </section>
    </main>
  );
}
