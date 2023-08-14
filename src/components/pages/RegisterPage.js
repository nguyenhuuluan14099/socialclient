import { Button } from "components/button";
import Field from "components/formGroup/Field";
import Input from "components/input";
import Label from "components/label/Label";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageLazy from "components/image/ImageLazy";

const schema = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .matches(/^\S*$/, {
      message: "Username have not been spacing",
    }),
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .matches(/.{8,}/, {
      message: "Password at least 8 character",
    })
    .required("Please enter your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const handleRegister = async (values) => {
    if (!isValid) return;

    const user = {
      username: values.username.toLowerCase(),
      email: values.email,
      password: values.password,
      desc: "welcome to my life",
      city: "hcm",
      relationship: 1,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/register`,
        user
      );
      toast.success("create account successfully!");
      reset({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  // useEffect(() => {
  //   const arrayError = Object.values(errors);
  //   if (arrayError.length > 0) {
  //     toast.error(arrayError[0]?.message, {
  //       pauseOnHover: false,
  //       delay: 500,
  //     });
  //   }
  // }, [errors]);
  console.log("error", errors);

  return (
    <div className=" bg-opacity-50 dark:bg-black max-w-[900px] mx-auto rounded-lg shadow-[rgba(60,_64,_67,_0.3)0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)0px_1px_3px_1px] max-h-[720px]  h-full w-full bg-white   items-center flex justify-between ">
      <div className=" w-full max-w-[350px] mx-auto dark:bg-black    h-[720px] rounded-lg ">
        <div className="flex flex-col items-center text-center ">
          <ImageLazy
            url="/logoHome.png"
            className="w-[39px] mb-3 mt-5 h-[35px] md:-ml-1 ml-5 object-cover "
            alt=""
          />
          <p className="text-2xl font-semibold">Register Account</p>
        </div>
        <form action="" onSubmit={handleSubmit(handleRegister)}>
          <Field>
            <Label htmlFor="username">User Name</Label>
            <Input
              focus
              IconInput="email"
              error={errors?.username?.message}
              control={control}
              name="username"
              placeholder="john123"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
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
              IconInput="password"
              error={errors?.password?.message}
              type="password"
              colorIcon
              placeholder="Password"
              hasIcon
              control={control}
              name="password"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              error={errors?.confirmPassword?.message}
              type="password"
              IconInput="password"
              hasIcon
              colorIcon
              control={control}
              name="confirmPassword"
              placeholder="Confirm Password"
            ></Input>
          </Field>
          <div className="flex items-center mb-5 gap-x-2">
            <p className="">You have been an account?</p>
            <p className="text-lg font-semibold text-blue-400 transition-all hover:text-blue-500">
              <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="flex">
            <Button
              type="submit"
              className="w-full h-full"
              isWaiting={isSubmitting}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-[400px] h-[720px] rounded-lg  ">
        <ImageLazy
          url="/loginLogo.jpg"
          className=" object-cover h-[720px] w-full rounded-lg"
          alt="LoginLogo"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
