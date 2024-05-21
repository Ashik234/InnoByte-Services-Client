import React from 'react'
import TextField from "@mui/material/TextField";
import { muiCustomTheme } from "../utils/muiThemeCreator";
import { Link, useNavigate } from "react-router-dom";
import { useFormikValidation } from "../validation/Formik";
import { useMutation } from "@tanstack/react-query";
import userRequest from "../utils/userRequest";
import { RegisterSchema } from "../validation/Yup";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Register() {
    const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const mutation = useMutation({
    mutationFn: (data) => {
      return userRequest.post("/register", data);
    },
    onSuccess: (data) => {
      localStorage.setItem("userJWT", data.data.token);
      toast.success(data.data.message);
      navigate("/");
    },
    onError: (error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
      console.log(error);
    },
  });

  const formik = useFormikValidation(mutation, RegisterSchema, initialValues);
  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    formik;
  return (
   <>
      <div className="flex justify-center bg-F9F9F9 p-4 sm:p-14 h-full">
        <div className="bg-white lg:rounded-l-xl rounded-l-md  border sm:w-1/2">
          <h1 className="p-4">LOGO</h1>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-bold text-2xl">
                Chase Your Goals, Not Just Jobs <br /> Register for Greatness!
              </h1>
            </div>
          </div>

          <div className="lg:w-96 sm:w-80 mx-auto px-4">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="mt-8">
                <TextField
                  name="username"
                  size="small"
                  label="Username"
                  className="w-full"
                  theme={muiCustomTheme}
                  InputProps={{ sx: { borderRadius: 4 } }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  error={touched.username && errors.username}
                />
                </div>
                <div
                  className={`${
                    touched.username && errors.username
                      ? "opacity-100"
                      : "opacity-0"
                  } text-red-500 text-xs`}
                >
                  {errors.username ? errors.username : "None"}
                </div>

              <div className="mt-2">
                <TextField
                  size="small"
                  label="Email"
                  name="email"
                  className="w-full"
                  theme={muiCustomTheme}
                  InputProps={{ sx: { borderRadius: 4 } }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && errors.email}
                />
                </div>
                <div
                  className={`${
                    touched.email && errors.email
                      ? "opacity-100"
                      : "opacity-0"
                  } text-red-500 text-xs`}
                >
                  {errors.email ? errors.email : "None"}
                </div>

              <div className="mt-2">
                <TextField
                  size="small"
                  label="Password"
                  name="password"
                  type="password"
                  className="w-full"
                  theme={muiCustomTheme}
                  InputProps={{ sx: { borderRadius: 4 } }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                </div>
                <div
                  className={`${
                    touched.password && errors.password
                      ? "opacity-100"
                      : "opacity-0"
                  } text-red-500 text-xs `}
                >
                  {errors.password ? errors.password : "None"}
                </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="border-2 p-2 rounded-lg w-56 text-white hover:drop-shadow-md bg-blue-500"
                >
                  <span style={{ marginRight: "10px" }}>Sign Up</span>
                </button>
              </div>
              <div className="flex justify-center">

                <p className="small fw-bold mt-2 pt-1 mb-4">
                    Already have an account?{" "}
                    <a href="/login"   style={{ color: "rgb(27, 133, 231)" }}>
                      Login
                    </a>
                  </p>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-slate-500 rounded-r-xl w-1/2 hidden sm:block"></div>
      </div>
    </>
  )
}

export default Register