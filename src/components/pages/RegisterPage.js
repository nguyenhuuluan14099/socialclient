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

const schema = yup.object({
  username: yup
    .string()
    .required("Please enter your username")
    .matches(/^\S*$/, {
      message: "username have not been spacing",
    }),
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
    mode: "onChange",
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
      await axios.post("https://serversocial.vercel.app/users/register", user);
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
  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message, {
        pauseOnHover: false,
        delay: 500,
      });
    }
  }, [errors]);

  return (
    <div
     style={{
        backgroundImage: `url(https://colorlib.com/etc/lf/Login_v16/images/bg-01.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    className="w-full p-4 bg-white  min-h-[100vh] items-center flex justify-center">
      <div className=" w-full max-w-[500px] bg-slate-200 p-3 rounded-lg ">
        <div className="text-center flex flex-col gap-y-1 items-center">
          <img
            src="/logoHome.png"
            className="w-[35px] mb-3 mt-5 h-[35px] md:-ml-1 ml-5 object-cover "
            alt=""
          />
          <p className="font-semibold text-2xl">Register Account</p>
        </div>
        <form action="" onSubmit={handleSubmit(handleRegister)}>
          <Field>
            <Label htmlFor="username">User Name</Label>
            <Input
              error={errors?.username?.message}
              control={control}
              name="username"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input control={control} name="email"></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              colorIcon
              hasIcon
              control={control}
              name="password"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              hasIcon
              colorIcon
              control={control}
              name="confirmPassword"
            ></Input>
          </Field>
          <div className="flex items-center gap-x-2 mb-5">
            <p className="  ">You have been an account?</p>
            <p className="font-semibold text-lg  hover:text-blue-500 transition-all text-blue-400">
              <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="flex">
            <Button type="submit" isWaiting={isSubmitting}>
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
