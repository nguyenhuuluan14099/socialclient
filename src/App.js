import "react-toastify/dist/ReactToastify.css";
import React, { Suspense } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "components/pages/NotFoundPage";
import ToggleDarkMode from "components/darkMode/ToggleDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "components/redux/actions/postAction";
import { socket } from "./socket";
import SocketClient from "SocketClient";
import { GLOBAL_TYPES } from "components/redux/actions/globalAction";
import { getNotifies } from "components/redux/actions/notifyAction";
import { refreshToken } from "components/redux/actions/authAction";

const DetailPostPage = React.lazy(() =>
  import("components/pages/DetailPostPage")
);
const ManageSystemPage = React.lazy(() =>
  import("components/pages/ManageSystemPage")
);
const HomePage = React.lazy(() => import("components/pages/HomePage"));
const RegisterPage = React.lazy(() => import("components/pages/RegisterPage"));
const SuggestPage = React.lazy(() => import("components/pages/SuggestPage"));
const LogInPage = React.lazy(() => import("components/pages/LogInPage"));
const ExplorePage = React.lazy(() => import("components/pages/ExplorePage"));
const AccountSettingPage = React.lazy(() =>
  import("components/pages/AccountSettingPage")
);
const ProfileLayout = React.lazy(() =>
  import("components/pages/profile/ProfileLayout")
);
const ProfilePosts = React.lazy(() =>
  import("components/pages/profile/ProfilePosts")
);
const ProfileSaved = React.lazy(() =>
  import("components/pages/profile/ProfileSaved")
);

const NavBar = React.lazy(() => import("components/layout/NavBar"));
const Messenger = React.lazy(() => import("components/messenger/Messenger"));

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());

    socket.connect();
    dispatch({ type: GLOBAL_TYPES.SOCKET, payload: socket });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  // useEffect(() => {
  //   if (auth?._id) dispatch(getPosts({ id: auth?._id }));
  // }, [dispatch, auth?._id]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getNotifies(auth.token));
      dispatch(getPosts(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <>
      <ToggleDarkMode hide></ToggleDarkMode>
      {auth.token && <SocketClient></SocketClient>}
      <Suspense>
        <Routes>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LogInPage></LogInPage>}></Route>

          <Route
            path="/"
            element={auth.token ? <NavBar></NavBar> : <LogInPage></LogInPage>}
          >
            <Route
              path="/post/:slug"
              element={<DetailPostPage></DetailPostPage>}
            ></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route
              path="/account/edit"
              element={<AccountSettingPage></AccountSettingPage>}
            ></Route>
            <Route
              path="/explore"
              element={<ExplorePage></ExplorePage>}
            ></Route>

            <Route
              path="/explore/people"
              element={<SuggestPage></SuggestPage>}
            ></Route>
            <Route
              path="/manageSystem"
              element={<ManageSystemPage></ManageSystemPage>}
            ></Route>

            <Route
              path="/messenger/*"
              element={<Messenger></Messenger>}
            ></Route>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            {/* <Route
              
                element={<ProfileLayout></ProfileLayout>}
              ></Route> */}
            <Route path="/" element={<HomePage></HomePage>}></Route>

            <Route
              path="/:slug/*"
              // path="/${user.user}/*"
              element={<ProfileLayout></ProfileLayout>}
            >
              <Route path="" element={<ProfilePosts></ProfilePosts>}></Route>
              <Route
                path={`:slug/`}
                // path=":slug"
                element={<ProfileSaved></ProfileSaved>}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
