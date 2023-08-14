import axios from "axios";
import { Button } from "components/button";
import { imgbbAPI } from "components/config/config";
import { useAuth } from "components/context/Auth-Context";
import ImageUpload from "components/image/ImageUpload";
import Input from "components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "components/header/Header";
import ImageLazy from "components/image/ImageLazy";

const AccountSettingPage = ({ socket }) => {
  const [reviewImage, setReviewImage] = useState("");
  const [progress, setProgress] = useState(0);
  // const [currentUser, setCurrentUser] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const { user, dispatch } = useAuth();
  // console.log("userhere", user);
  const demo = yup.object({});
  const schema = yup.object({
    username: yup.string().required("Please enter your username"),
    currentPassword: yup
      .string()
      .matches(/.{8,}/, {
        message: "Password at least 8 character",
      })
      .required("Please enter your password"),
    password: yup
      .string()
      .matches(/.{8,}/, {
        message: "Password at least 8 character",
      })
      .required("Please enter your password"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please enter your password"),
  });
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(changePassword ? schema : demo),
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_SERVER_URL}/users/${user._id}`
  //       );
  //       setCurrentUser(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [user._id]);

  useEffect(() => {
    const arrayError = Object.values(errors);
    if (arrayError.length > 0) {
      toast.error(arrayError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleUpdate = async (values) => {
    if (!user._id) return;
    const data = {
      userId: user._id,
      username: values.username.toLowerCase(),
      profilePicture: values.image_post,
      desc: values.desc,
      city: values.city.toLowerCase(),
      password: values?.password,
      currentPassword: values?.currentPassword,
    };
    try {
      await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/`, data);
      dispatch({
        type: "UPDATE_USER",
        username: data.username,
        desc: data.desc,
        city: data.city,
        profilePicture: data.profilePicture,
      });
      toast.success("updated user successfully");
      // window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data, {
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    reset({
      username: user?.username,
      img_post: user?.profilePicture,
      desc: user?.desc || "",
      city: user?.city || "",
    });
  }, [user, reset]);
  const handleUploadImage = async (e) => {
    const file = e.target.files;
    if (!file) return;
    const bodyFormData = new FormData();
    bodyFormData.append("image", file[0]);
    const response = await axios({
      method: "post",
      url: `${imgbbAPI}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
    const imgData = response.data.data;
    setReviewImage(imgData?.url);
    if (!imgData) {
      console.log("can not fine your image");
    }
    const objectImg = {
      thumb: imgData.thumb.url,
      url: imgData.url,
    };
    setValue("image_post", objectImg);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  return (
    <>
      <Header socket={socket}></Header>
      <div className=" py-5 mt-16 w-full max-w-[900px] ">
        <div className="border p-3 border-slate-300 rounded-[4px] flex flex-col gap-y-3">
          <p className="text-[25px] m-5">Edit profile</p>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="w-full max-w-[500px]  flex flex-col  gap-y-3 mx-auto">
              <div className="flex items-center justify-between w-full mx-auto max-w-[350px]">
                <div className="w-[80px] relative h-[80px] flex items-center justify-center rounded-full ">
                  {reviewImage ? (
                    <ImageLazy
                      url={reviewImage}
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                  ) : (
                    <ImageLazy
                      url={
                        user?.profilePicture?.thumb ||
                        "https://i.ibb.co/1dSwFqY/download-1.png"
                      }
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                  )}
                  {progress !== 0 && !reviewImage && (
                    <div className="w-[30px] h-[30px] absolute  rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin "></div>
                  )}
                </div>
                {/* {!reviewImage && (
                <div className="w-[30px] h-[30px] rounded-full border-[3px] border-blue-500 border-t-transparent animate-spin"></div>
              )} */}
                <div>
                  <Input
                    control={control}
                    name="username"
                    placeholder="username"
                    className=""
                  ></Input>
                  <input
                    accept="image/png, image/gif, image/jpeg"
                    id="imageEdit"
                    type="file"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                  <div className="">
                    <label
                      htmlFor="imageEdit"
                      className="text-blue-500 cursor-pointer transition-all font-semibold hover:text-blue-400"
                    >
                      Change your profilePicture
                    </label>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setChangePassword(!changePassword)}
                className="hover:text-blue-700 mx-auto cursor-pointer text-blue-500 font-semibold text-[13px]"
              >
                Password and security
              </div>
              {changePassword ? (
                <div
                  className={`${
                    changePassword ? "" : "hidden"
                  } flex flex-col gap-y-3`}
                >
                  <div className="flex items-center  gap-x-10 w-full max-w-[400px] mx-auto">
                    <p className="text-[13px] w-[200px] font-semibold">
                      Current Password
                    </p>
                    <Input
                      placeholder="password"
                      hasIcon
                      control={control}
                      name="currentPassword"
                      type="password"
                    ></Input>
                  </div>
                  <div className="flex items-center gap-x-10 w-full max-w-[400px] mx-auto">
                    <p className="text-[13px] w-[200px] font-semibold">
                      New Password
                    </p>
                    <Input
                      placeholder="password"
                      type="password"
                      hasIcon
                      control={control}
                      name="password"
                    ></Input>
                  </div>

                  <div className="flex items-center gap-x-10 w-full max-w-[400px] mx-auto">
                    <p className="text-[13px] w-[200px] font-semibold">
                      Confirm New Password
                    </p>
                    <Input
                      placeholder="password"
                      type="password"
                      hasIcon
                      control={control}
                      name="confirmNewPassword"
                    ></Input>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="flex items-center gap-x-10 w-full max-w-[400px] mx-auto">
                <p className="text-[13px] w-[200px] font-semibold">
                  Description
                </p>
                <Input
                  placeholder="description"
                  type="text"
                  control={control}
                  name="desc"
                ></Input>
              </div>
              <div className="flex items-center gap-x-10 w-full max-w-[400px] mx-auto">
                <p className="text-[13px] w-[200px] font-semibold">City</p>
                <Input
                  placeholder="city"
                  type="text"
                  control={control}
                  name="city"
                ></Input>
              </div>
              <Button className="mb-5" isWaiting={isSubmitting} type="primary">
                Update account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountSettingPage;
