import axios from "axios";
import { AuthProvider, useAuth } from "components/context/Auth-Context";
import "react-toastify/dist/ReactToastify.css";
import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import NotFoundPage from "components/pages/NotFoundPage";
import GlobalDarkMode from "components/darkMode/GlobalDarkMode";
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
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();
  React.useEffect(() => {
    setSocket(io("https://endsocketne1.onrender.com"));
    // setSocket(io("ws://localhost:8900"));

    return () => {
      // socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.emit("addNewUser01", user?.username);
    socket?.emit("addUser", user?._id);
  }, [socket, user?.username, user?._id]);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [navigate, user]);

  return (
    <AuthProvider>
      <GlobalDarkMode>
        <Suspense>
          <Routes>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route path="/login" element={<LogInPage></LogInPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route path="/" element={<NavBar socket={socket}></NavBar>}>
              <Route
                path="/post/:slug"
                element={<DetailPostPage socket={socket}></DetailPostPage>}
              ></Route>
              <Route
                path="/account/edit"
                element={
                  <AccountSettingPage socket={socket}></AccountSettingPage>
                }
              ></Route>
              <Route
                path="/explore"
                element={<ExplorePage socket={socket}></ExplorePage>}
              ></Route>
              <Route
                path="/explore/people"
                element={<SuggestPage></SuggestPage>}
              ></Route>
              <Route
                path="/manageSystem"
                element={<ManageSystemPage socket={socket}></ManageSystemPage>}
              ></Route>

              <Route
                path="/messenger/*"
                element={<Messenger socketMes={socket}></Messenger>}
              ></Route>
              <Route
                path="/"
                element={<HomePage socket={socket}></HomePage>}
              ></Route>
              {/* <Route
              
                element={<ProfileLayout></ProfileLayout>}
              ></Route> */}
              <Route path="/" element={<HomePage></HomePage>}></Route>

              <Route
                path="/:slug/*"
                element={<ProfileLayout socket={socket}></ProfileLayout>}
              >
                <Route
                  path=""
                  element={<ProfilePosts socket={socket}></ProfilePosts>}
                ></Route>
                <Route
                  path=":slug"
                  element={<ProfileSaved socket={socket}></ProfileSaved>}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </GlobalDarkMode>
    </AuthProvider>
  );
}

export default App;
