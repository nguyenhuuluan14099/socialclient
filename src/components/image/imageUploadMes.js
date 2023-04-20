import axios from "axios";
import { imgbbAPI } from "components/config/config";

export const imageUpload = async (value) => {
  for (const item of value) {
    const bodyFormData = new FormData();
    bodyFormData.append("image", item);

    const response = await axios({
      method: "post",
      url: `${imgbbAPI}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const imgData = response.data.data;
    const objectImg = {
      thumb: imgData.thumb.url,
      url: imgData.url,
    };
    return objectImg;
  }
};
