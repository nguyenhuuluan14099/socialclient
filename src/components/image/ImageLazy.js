import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ImageLazy = ({ url, className = "", height = "", width = "" }) => {
  return (
    <LazyLoadImage
      height={height}
      width={width}
      className={` ${className}`}
      alt="image"
      effect="blur"
      src={url}
    ></LazyLoadImage>
  );
};

export default ImageLazy;
