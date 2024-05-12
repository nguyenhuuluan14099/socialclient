import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import ItemReplyCmt from "./ItemReplyCmt";

const ViewMoreCmt = ({ comment, cmtReply, post }) => {
  const [cmtsReply, setCmtsReply] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (cmtReply.length > 0) {
      const cmt = cmtReply.filter((cmt) => cmt.reply.includes(comment._id));
      setCmtsReply(cmt);
    }
  }, [cmtReply, comment._id]);

  return (
    <div>
      {cmtsReply.length > 0 ? (
        <div
          onClick={() => setShow(!show)}
          className="flex items-center gap-x-3  text-[13px] text-slate-400  cursor-pointer"
        >
          <p className="mb-3">___</p>
          <p>{`${show ? "Hide" : "View"} all ${
            show ? "" : `${cmtsReply.length}`
          } replies`}</p>
        </div>
      ) : (
        <></>
      )}

      {show && (
        <>
          {cmtsReply.length > 0 &&
            cmtsReply.map((rep) => {
              return (
                <div
                  key={v4()}
                  className={`flex w-full ml-auto  gap-x-3 justify-between `}
                >
                  <ItemReplyCmt
                    cmtReply={cmtReply}
                    post={post}
                    comment={comment}
                    rep={rep}
                  ></ItemReplyCmt>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default ViewMoreCmt;
