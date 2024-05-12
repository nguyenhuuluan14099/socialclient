import { Button } from "components/button";
import Input from "components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Header from "components/header/Header";
import ImageLazy from "components/image/ImageLazy";
import TextArea from "components/textarea/TextArea";
import { checkImage, imageUpload } from "components/image/imageUploadMes";
import { toastContent } from "components/toast/toast";
import { putDataApi } from "utils/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_TYPES } from "components/redux/actions/globalAction";
// import { AUTH_TYPES } from "components/redux/actions/authAction";

const AccountSettingPage = () => {
  const [reviewImage, setReviewImage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
  });
  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleUpdate = async (values) => {
    let imgArr = [];

    if (avatar) {
      imgArr = await imageUpload([avatar]);
      setValue("profilePicture", imgArr);
    } else {
      setValue("profilePicture", auth.user.profilePicture);
    }

    const newUser = {
      fullname: values.fullname.toLowerCase(),
      desc: values.desc,
      city: values.city.toLowerCase(),
      profilePicture: values.profilePicture,
    };

    const validData =
      newUser.fullname === auth.user.fullname &&
      newUser.profilePicture[0].imageId ===
        auth.user.profilePicture[0].imageId &&
      newUser.desc === auth.user.desc &&
      newUser.city === auth.user.city;

    if (validData) return;
    try {
      const res = await putDataApi("user", newUser, auth.token);

      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: { ...auth, user: { ...auth.user, ...newUser } },
      });
      toast.success(res.data.msg, toastContent());
    } catch (error) {
      toast.error(error.response.data.msg, toastContent());
    }
  };

  useEffect(() => {
    reset({
      fullname: auth.user.fullname,
      profilePicture: auth.user.profilePicture,
      desc: auth.user.desc,
      city: auth.user.city,
    });
  }, [auth.user, reset]);

  const handleChangeImage = async (e) => {
    const images = e.target.files[0];
    const err = checkImage(images);
    images.reviewImage = window.URL.createObjectURL(images);
    setReviewImage(images.reviewImage);
    if (err) {
      toast.error(err, toastContent());
    }
    setAvatar(images);
  };

  useEffect(() => {
    return () => {
      if (reviewImage) window.URL.revokeObjectURL(reviewImage);
    };
  }, [reviewImage]);

  return (
    <>
      <div className=" py-5 mt-16 w-full max-w-[900px] ">
        <div className="border p-3 border-slate-300 rounded-[4px] flex flex-col gap-y-3">
          <p className="text-[25px] m-5">Edit profile</p>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="w-full max-w-[500px]  flex flex-col  gap-y-3 mx-auto">
              <div className="flex items-center justify-between w-full mx-auto max-w-[350px]">
                <div className="w-[80px] relative h-[80px] flex items-center justify-center rounded-full ">
                  {
                    <ImageLazy
                      url={
                        reviewImage || auth.user.profilePicture[0].imageThumb
                      }
                      alt=""
                      className="w-[80px] h-[80px] object-cover rounded-full"
                    />
                  }
                </div>

                <div>
                  <Input
                    control={control}
                    name="fullname"
                    placeholder="fullname"
                    className=""
                  ></Input>
                  <input
                    accept="image/png, image/gif, image/jpeg"
                    id="imageEdit"
                    type="file"
                    onChange={handleChangeImage}
                    className="hidden"
                  />
                  <div className="">
                    <label
                      htmlFor="imageEdit"
                      className="font-semibold text-blue-500 transition-all cursor-pointer hover:text-blue-400"
                    >
                      Change your profilePicture
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-x-10 w-full max-w-[400px] mx-auto">
                <p className="text-[13px] w-[200px] font-semibold">
                  Description
                </p>
                <TextArea
                  control={control}
                  name="desc"
                  className="border rounded-lg border-slate-300"
                  placeholder="Description..."
                ></TextArea>
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
              <Button
                className="mb-5 w-[200px]"
                isWaiting={isSubmitting}
                type="submit"
              >
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
