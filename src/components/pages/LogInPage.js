import Button from "components/button/Button";
import Field from "components/formGroup/Field";
import Input from "components/input";
import Label from "components/label/Label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginCall } from "apiCall";
import { useAuth } from "components/context/Auth-Context";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const schema = yup.object({
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    )
    .required("Please enter your password"),
});
const LogInPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleReset = () => {
    reset({
      email: "",
      password: "",
    });
  };
  const { user, dispatch } = useAuth();
  const handleLogin = async (values) => {
    if (!isValid) return;
    try {
      await loginCall(
        {
          email: values.email,
          password: values.password,
        },
        dispatch,
        handleReset
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const arrErr = Object.values(errors);
    if (arrErr.length > 0) {
      toast.error(arrErr[0]?.message, {
        pauseOnHover: true,
      });
    }
  }, [errors]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // console.log("user in login page", user);
  return (
    <div
     style={{
        backgroundImage: `url(https://colorlib.com/etc/lf/Login_v16/images/bg-01.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    className="w-full bg-white p-4  min-h-[100vh] items-center flex justify-center">
      <div className=" w-full max-w-[500px] bg-slate-200 p-3 rounded-lg ">
        <div className="text-center flex flex-col gap-y-1 items-center">
          <img
            src="/logoHome.png"
            className="w-[35px] mb-3 mt-5 h-[35px] md:-ml-1 ml-5 object-cover "
            alt=""
          />
          <p className="font-semibold text-2xl">Login Account</p>
        </div>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input control={control} name="email"></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              hasIcon
              colorIcon
              control={control}
              name="password"
            ></Input>
          </Field>
          <div className="flex items-center gap-x-2 mb-5">
            <p className="  ">You have been an account?</p>
            <p className="font-semibold text-lg  hover:text-blue-500 transition-all text-blue-400">
              <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="flex">
            <Button type="submit" isWaiting={isSubmitting}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
