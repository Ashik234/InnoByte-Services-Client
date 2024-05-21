import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { muiCustomTheme } from "../utils/muiThemeCreator";
import { useNavigate } from "react-router-dom";
import { useFormikValidation } from "../validation/Formik";
import { useMutation } from "@tanstack/react-query";
import userRequest from "../utils/userRequest";
import { LoginSchema } from "../validation/Yup";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Login() {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const mutation = useMutation({
    mutationFn: (data) => {
      return userRequest.post("/login", data);
    },
    onSuccess: (data) => {
        localStorage.setItem("userJWT", data.data.token);
        console.log(data);
      toast.success(data.data.message);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormikValidation(mutation, LoginSchema, initialValues);
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    formik;
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="md:w-96 sm:w-80 ">
          <form
            className="rounded-lg p-12"
            style={{ outline: "1px solid rgb(27, 133, 231)" }}
            onSubmit={handleSubmit}
          >
            <h2 className="font-bold text-xl text-center">Login</h2>

            <div className="mt-4">
              <TextField
                name="email"
                size="small"
                theme={muiCustomTheme}
                label="Email"
                className="w-full rounded-md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
              />
            </div>
            <div
              className={`${
                touched.email && errors.email ? "opacity-100" : "opacity-0"
              } text-red-500 text-xs`}
            >
              {errors.email ? errors.email : "None"}
            </div>

            <div className="mt-4">
              <TextField
                name="password"
                size="small"
                theme={muiCustomTheme}
                label="Password"
                className="w-full rounded-md"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && errors.password}
              />
            </div>
            <div
              className={`${
                touched.password && errors.password ? "opacity-100" : "opacity-0"
              } text-red-500 text-xs mb-4`}
            >
              {errors.password ? errors.password : "None"}
            </div>
            <div>
              <Button
              type="submit"
                variant="contained"
                size="medium"
                className="w-full mt-2"
                style={{ fontWeight: "bold" }}
              >
                LOGIN
              </Button>
            </div>
            <div className="mb-2 mt-2 ml-8 sm:ml-4 md:ml-8 lg:ml-8 xl:ml-14">
              <span className="text-xs">Don't have an account? </span>
              <Link
                className="text-sm"
                to="/register"
                style={{ color: "rgb(27, 133, 231)" }}
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
