import { useAuth } from "components/context/Auth-Context";
import ModalBase from "components/modal/ModalBase";
import FollowingModalContent from "components/modal/ModalContent/FollowingModalContent";
import React, { useEffect, useState } from "react";

const ViewFollowings = ({ slug }) => {
  const { user } = useAuth();
  const [showFollowings, setShowFollowings] = useState(false);
  useEffect(() => {
    if (showFollowings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showFollowings]);
  return (
    <div>
      <div
        onClick={() => setShowFollowings(true)}
        className="cursor-pointer flex items-center gap-x-2"
      >
        <p className="font-[600]">{`${user.followings?.length || 0}`}</p>
        <p>following</p>
      </div>

      {showFollowings && (
        <ModalBase
          visible={showFollowings}
          onClose={() => setShowFollowings(false)}
        >
          <FollowingModalContent
            slug={slug}
            onClose={() => setShowFollowings(false)}
          ></FollowingModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default ViewFollowings;
