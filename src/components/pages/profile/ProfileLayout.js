import ModalBase from "components/modal/ModalBase";
import ValidFollowContent from "components/modal/ModalContent/ValidFollowContent";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "components/loading/Loading";
import { getProfileUser } from "components/redux/actions/profileAction";
import Infor from "./Infor";
import ProfilePosts from "./ProfilePosts";
import ProfileSaved from "./ProfileSaved";

const ProfileLayout = () => {
  const { slug } = useParams();
  const [showFollow, setShowFollow] = useState(false);
  const [savedTab, setSavedTab] = useState(false);
  const { auth, error, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.ids.every((item) => item !== slug)) {
      dispatch(getProfileUser({ slug, token: auth.token }));
    }
  }, [dispatch, profile.ids, slug, auth.token]);

  return (
    <div className="laptop:ml-[130px]">
      {error.payload ? (
        <div className="min-h-[100vh] flex items-center justify-center font-bold text-[50px]">
          <p>{error.payload}</p>
        </div>
      ) : (
        <>
          <Infor id={slug} profile={profile} dispatch={dispatch}></Infor>
          <div className="container flex flex-col sideBarProfile">
            <div className="flex w-full max-w-[250px] justify-center mx-auto gap-x-3">
              <button
                onClick={() => setSavedTab(false)}
                className={`${savedTab ? "" : "font-bold dark:text-white}"}`}
              >
                Posts
              </button>
              {auth.user._id === slug && (
                <button
                  onClick={() => setSavedTab(true)}
                  className={`${savedTab ? "font-bold dark:text-white" : ""}`}
                >
                  Saved
                </button>
              )}
            </div>
            {
              <>
                {savedTab ? (
                  <ProfileSaved></ProfileSaved>
                ) : (
                  <ProfilePosts
                    user={auth.user}
                    id={slug}
                    dispatch={dispatch}
                    profile={profile}
                  ></ProfilePosts>
                )}
              </>
            }
          </div>
          {/* {profile.loading ? (
            <div className="my-5 ">
              <Loading></Loading>
            </div>
          ) : (
           
          )} */}
          {showFollow && (
            <ModalBase
              visible={showFollow}
              onClose={() => setShowFollow(false)}
            >
              <ValidFollowContent
                // handleUnFollow={handleUnFollow}
                // user={user}
                onClose={() => setShowFollow(false)}
              ></ValidFollowContent>
            </ModalBase>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileLayout;
