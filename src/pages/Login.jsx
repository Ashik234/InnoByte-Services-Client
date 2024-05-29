import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { muiCustomTheme } from "../utils/muiThemeCreator";
import { useFormikValidation } from "../validation/Formik";
import { useMutation } from "@tanstack/react-query";
import userRequest from "../utils/userRequest";
import { LoginSchema } from "../validation/Yup";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useDispatch } from "react-redux";
import { changeUserDetails } from "../Redux/user/userSlice";
import OtpVerify from "./OtpVerify";
function Login() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const initialValues = { email: "", password: "" };

  const mutation = useMutation({
    mutationFn: (data) => {
      return userRequest.post("/login", data);
    },
    onSuccess: (data) => {
      toast.success("OTP sent to your email.");
      setEmail(data.data.user.email);
      setIsLogin(true);
      dispatch(
        changeUserDetails({
          userId: data.data.user._id,
          username: data.data.user.username,
          email: data.data.user.email,
          contact: data.data.user.contact,
          about: data.data.user.about,
          image: data.data.user.imageUrl,
        })
      );
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
      <div className="flex justify-center p-4 sm:p-24 h-full">
      {isLogin ? (
          <OtpVerify email={email} />
        ) : (
          <div className="bg-white lg:rounded-l-xl rounded-l-md border sm:w-1/2">
            <img
              className="w-32 h-32"
              src="https://media.licdn.com/dms/image/D560BAQGqQE-xTODoGA/company-logo_200_200/0/1708108358962/innobyte_services_logo?e=2147483647&v=beta&t=AKYAufKyxX7Li2E6V6y5iB9B3mDod4Wg8RVpCFLBzvU"
              alt=""
            />

            <div className="flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-bold text-2xl mb-4">
                  Login for Greatness!
                </h1>
              </div>
            </div>

            <div className="lg:w-96 sm:w-80 mx-auto px-4">
              <form onSubmit={handleSubmit} className="flex flex-col">
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
                    error={touched.email && !!errors.email}
                  />
                  <div
                    className={`text-red-500 text-xs ${
                      touched.email && errors.email
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {errors.email || "None"}
                  </div>
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
                    error={touched.password && !!errors.password}
                  />
                  <div
                    className={`text-red-500 text-xs ${
                      touched.password && errors.password
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {errors.password || "None"}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className="w-56 mt-2"
                    style={{ fontWeight: "bold" }}
                  >
                    LOGIN
                  </Button>
                </div>
                <div className="mb-2 mt-4 ml-8 sm:ml-4 md:ml-8 lg:ml-8 xl:ml-16">
                  <span>Don't have an account? </span>
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

        )}
        <div className=" rounded-r-xl w-1/2 hidden sm:block">
          <img
            src="https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Descriptive Alt Text"
            className="rounded-r-xl w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
