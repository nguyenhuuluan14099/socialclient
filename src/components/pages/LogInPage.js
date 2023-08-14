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
import { Link, useNavigate } from "react-router-dom";
import ImageLazy from "components/image/ImageLazy";
const schema = yup.object({
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .matches(/.{8,}/, {
      message: "Password at least 8 character",
    })
    .required("Please enter your password"),
});
const LogInPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onBlur",
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
  // useEffect(() => {
  //   const arrErr = Object.values(errors);
  //   if (arrErr.length > 0) {
  //     toast.error(arrErr[0]?.message, {
  //       pauseOnHover: true,
  //     });
  //   }
  // }, [errors]);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  // console.log("user in login page", user);
  return (
    <div className="mt-10 bg-opacity-50 dark:bg-black  max-w-[900px] mx-auto rounded-lg shadow-[rgba(60,_64,_67,_0.3)0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)0px_1px_3px_1px] max-h-[600px]  h-full w-full bg-white   items-center flex justify-between ">
      <div className="p-3 w-full max-w-[350px] mx-auto dark:bg-black   h-[600px] bg-white  rounded-lg ">
        <div className="flex flex-col items-center text-center gap-y-1">
          <ImageLazy
            url="/logoHome.png"
            className="w-[39px] mb-3 mt-5 h-[35px] md:-ml-1 ml-5 object-cover "
            alt=""
          />
          <p className="text-2xl font-semibold">Social Network</p>
        </div>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              focus
              IconInput="username"
              placeholder="john123@gmail.com"
              error={errors?.email?.message}
              control={control}
              name="email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              error={errors?.password?.message}
              type="password"
              placeholder="password"
              hasIcon
              IconInput="password"
              colorIcon
              control={control}
              name="password"
            ></Input>
          </Field>
          <div className="flex items-center mb-5 gap-x-2">
            <p className="">You have been an account?</p>
            <p className="text-lg font-semibold text-blue-400 transition-all hover:text-blue-500">
              <Link to="/register">Register</Link>
            </p>
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="w-full h-full"
              isWaiting={isSubmitting}
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-[400px] h-[600px] rounded-lg  ">
        <ImageLazy
          url="/loginLogo.jpg"
          className=" object-cover h-[600px] w-full rounded-lg"
          alt="LoginLogo"
        />
      </div>
    </div>
  );
};

export default LogInPage;
