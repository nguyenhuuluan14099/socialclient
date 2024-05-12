import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = ({ content, setContent = () => {} }) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    []
  );
  return (
    <>
      <ReactQuill
        placeholder="Write a caption..."
        modules={modules}
        theme="snow"
        value={content}
        onChange={setContent}
      />
    </>
  );
};

export default Quill;
