import { imgbbAPI } from "components/config/config";

export const checkImage = (file) => {
  let err = "";

  if (!file) err = "image does not exist!";

  if (file.size > 1024 * 1024) err = "image largest is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "image format is incorrect";

  return err;
};

export const imageUpload = async (values) => {
  const arrImg = [];
  for (const image of values) {
    const bodyFormData = new FormData();
    bodyFormData.append("image", image);
    const res = await fetch(`${imgbbAPI}`, {
      method: "POST",
      body: bodyFormData,
    });
    const images = await res.json();
    console.log("imageshere", images);
    arrImg.push({
      imageId: images.data.id,
      imageThumb: images.data.thumb.url,
      imageUrl: images.data.display_url,
    });
  }
  return arrImg;
};
