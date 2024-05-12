import ModalBase from "components/modal/ModalBase";
import FollowerModalContent from "components/modal/ModalContent/FollowerModalContent";
import React, { useEffect, useState } from "react";

const ViewFollowers = ({ slug, user, follower = false }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  useEffect(() => {
    if (showFollowers) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showFollowers]);
  return (
    <div>
      <div
        // to={`/followers`}
        onClick={() => setShowFollowers(true)}
        className="flex items-center cursor-pointer gap-x-2"
      >
        <p className="font-[600]">{`${
          follower ? user.followers.length : user.followings.length
        } `}</p>
        <p>{follower ? "followers" : "followings"}</p>
      </div>

      {showFollowers && (
        <ModalBase
          visible={showFollowers}
          onClose={() => setShowFollowers(false)}
        >
          <FollowerModalContent
            follower={follower}
            user={user}
            onClose={() => setShowFollowers(false)}
          ></FollowerModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default ViewFollowers;
