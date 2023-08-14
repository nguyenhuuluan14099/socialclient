import axios from "axios";
import { imgbbAPI } from "components/config/config";
import ProgressBar from "react-customizable-progressbar";
import React, { useEffect, useState } from "react";
import IconPhoto from "components/icons/IconPhoto";
import ImageLazy from "./ImageLazy";

const ImageUpload = ({ onChange = () => {}, name = "", imageViewEdit }) => {
  const [reviewImage, setReviewImage] = useState();
  const [progress, setProgress] = useState(0);
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
      console.log("can not find your image");
    }
    const objectImg = {
      thumb: imgData.thumb.url,
      url: imgData.url,
    };
    onChange(name, objectImg);
  };
  return (
    <div
      style={{
        // backgroundImage: `url(${reviewImage})}`,
        // height: "300px xl:500px",
        height: "100%",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
      //h-[300px] xl:h-[500px]
      className="flex items-center here cursor-pointer borer border-red-500  relative justify-center w-[450px] max-w-[100%] "
    >
      <label className="w-full h-full cursor-pointer flex items-center justify-center">
        {imageViewEdit ? (
          <></>
        ) : (
          <>
            <input
              accept="image/png, image/gif, image/jpeg"
              id="image-input"
              type="file"
              onChange={handleUploadImage}
              hidden
            />
          </>
        )}

        <>
          {progress === 0 && !reviewImage && (
            <>
              {imageViewEdit ? (
                <></>
              ) : (
                <>
                  <div
                    className={`w-full  max-w-[200px] flex items-center  flex-col gap-y-3 ${
                      progress !== 0 ? "opacity-0 invisible" : ""
                    } `}
                  >
                    <IconPhoto></IconPhoto>
                    <p className="text-xl font-semibold">Choose your photo</p>
                    <label
                      htmlFor="image-input"
                      className="px-3 py-2 cursor-pointer rounded-lg text-white bg-blue-500 transition-all hover:bg-blue-800"
                    >
                      Select from computer
                    </label>
                  </div>
                </>
              )}
            </>
          )}

          {(reviewImage || imageViewEdit) && (
            <>
              <div className="  w-full  cursor-pointer  flex">
                {/* <img
                  className="object-cover h-full rounded-bl-lg w-[500px] z-9999  z-10 mx-auto   my-auto  bg-opacity-70 max-h-[300px]"
                  src={imageViewEdit || reviewImage}
                  alt=""
                /> */}
                <ImageLazy
                  height="100%"
                  width="100%"
                  className="object-cover   w-full  z-9999  z-10 mx-auto    bg-opacity-70 h-full"
                  url={imageViewEdit || reviewImage}
                ></ImageLazy>
              </div>

              {/* <div
                style={{
                  backgroundImage: `url(${imageViewEdit || reviewImage})`,
                  height: "300px",
                  width: "100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
                className="w-full absolute  max-w-[500px] h-[300px] xl:h-[500px] max-h-[501px] rounded-bl-lg "
              ></div>
              <div className="w-full absolute backdrop-blur-sm  max-w-[500px] h-[300px] xl:h-[500px] max-h-[501px] rounded-bl-lg bg-black bg-opacity-50"></div> */}
            </>
          )}

          {progress !== 0 && !reviewImage && (
            <ProgressBar
              strokeWidth={12}
              trackStrokeWidth={8}
              strokeColor="#1C9EE3"
              progress={progress}
              radius={100}
              className=" flex relative items-center !w-[150px]"
            >
              <p className="font-semibold w-full text-blue-400 -translate-x-[20px] text-xl absolute left-2/4 ">
                {`${progress}%`}
              </p>
            </ProgressBar>
          )}
        </>
      </label>
    </div>
  );
};
//
export default ImageUpload;
// {imageEdit || reviewImage ? (
//   <div>
//     <img
//       src={imageEdit || reviewImage}
//       alt=""
//       className="object-cover rounded-lg"
//     />
// className=" "

//   </div>
// )
