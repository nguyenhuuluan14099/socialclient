import { useAuth } from "components/context/Auth-Context";
import ModalBase from "components/modal/ModalBase";
import FollowerModalContent from "components/modal/ModalContent/FollowerModalContent";
import React, { useEffect, useState } from "react";

const ViewFollowers = ({ slug }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (showFollowers) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showFollowers]);
  if (!user) return;
  return (
    <div>
      <div
        // to={`/followers`}
        onClick={() => setShowFollowers(true)}
        className="cursor-pointer flex items-center gap-x-2"
      >
        <p className="font-[600]">{`${user.followers?.length || 0}`}</p>
        <p>followers</p>
      </div>

      {showFollowers && (
        <ModalBase
          visible={showFollowers}
          onClose={() => setShowFollowers(false)}
        >
          <FollowerModalContent
            slug={slug}
            onClose={() => setShowFollowers(false)}
          ></FollowerModalContent>
        </ModalBase>
      )}
    </div>
  );
};

export default ViewFollowers;
