import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import SendMes from "./SendMes";
import Message from "components/message/Message";
import { v4 } from "uuid";
import {
  deleteConversation,
  getMessages,
  loadMoreMessage,
} from "components/redux/actions/messageAction";
import NotMessenger from "./NotMessenger";
import ModalBase from "components/modal/ModalBase";
import IconBack from "components/icons/IconBack";

const RightSide = ({ mobileShow, setMobileShow = () => {} }) => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(9);
  const [showValid, setShowValid] = useState(false);
  const { message, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const slug = useParams();
  const id = slug["*"];
  const messageRef = useRef();
  const pageEnd = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const check = message.data.every((item) => item._id !== id);
    const getMessage = async () => {
      if (check) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          messageRef.current &&
            messageRef.current.scrollIntoView({
              behavior: "instant",
              block: "end",
            });
        }, 50);
      }
    };
    getMessage();
  }, [dispatch, auth, id, message.data]);

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [id, message.data]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      const newUser = message.users.find((user) => user._id === id);
      setTimeout(() => {
        messageRef.current &&
          messageRef.current.scrollIntoView({
            behavior: "instant",
            block: "end",
          });
      }, 50);
      if (newUser) setUser([newUser]);
    }
  }, [message.users, id]);

  useEffect(() => {
    if (!id) return;
    if (result >= (page - 1) * 9 && page > 1) {
      dispatch(loadMoreMessage({ id, auth, page }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  const handleDeleteConversation = () => {
    dispatch(deleteConversation({ auth, id }));
    setShowValid(false);
    setData([]);
    setUser([]);
    navigate("/messenger");
  };
  return (
    <div
      className={` ${
        mobileShow
          ? "block laptop:block     dark:bg-black z-40"
          : "hidden laptop:block"
      } laptop:flex-4 h-[500px]  laptop:h-[700px] w-full  border-transparent border  dark:border-[#262626]  border-x-slate-300 `}
    >
      <div className=" dark:bg-black z-50 laptop:mt-0 h-[570px] laptop:h-[700px] flex flex-col w-full ">
        <div className=" w-full    laptop:h-full overflow-y-scroll relative">
          {user.length > 0 && (
            <div className="border border-transparent w-full  flex items-center justify-between border-b-slate-300 dark:border-[#262626] py-5 px-3 sticky z-10 bg-white dark:bg-black dark:text-white top-0 left-0">
              <div className="flex items-center  w-full ">
                <>
                  <span
                    onClick={() => setMobileShow(false)}
                    className={`mr-3 cursor-pointer laptop:hidden  ${
                      mobileShow ? "block " : "hidden "
                    } `}
                  >
                    <IconBack></IconBack>
                  </span>
                  {user.length > 0 &&
                    user.map((u) => (
                      <Link key={u._id} to={`/${u._id}`}>
                        <div className="flex items-center gap-x-2">
                          <img
                            src={
                              u.profilePicture[0].imageThumb ||
                              "https://i.ibb.co/1dSwFqY/download-1.png"
                            }
                            className="w-[30px] h-[30px] object-cover rounded-full"
                            alt=""
                          />
                          <p className="cursor-pointer hover:text-slate-400 transition-0.7s text-[15px] font-semibold">
                            {u.fullname}
                          </p>
                        </div>
                      </Link>
                    ))}
                </>

                <div
                  className="cursor-pointer ml-auto"
                  onClick={() => setShowValid(true)}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messageRef}>
            <button
              style={{ marginTop: "-25px", opacity: 0 }}
              className=""
              ref={pageEnd}
            >
              Load more
            </button>
            {data.length > 0 &&
              data.map((m, index) => (
                <div key={index} className="z-[9999]">
                  <Message
                    user={user}
                    id={id}
                    data={data}
                    message={m}
                  ></Message>
                </div>
              ))}
            {data.length === 0 && <NotMessenger user={user}></NotMessenger>}
          </div>
        </div>

        {user.length > 0 && (
          <SendMes
            id={id}
            handleScroll={() => {
              messageRef.current &&
                messageRef.current.scrollIntoView({
                  behavior: "instant",
                  block: "end",
                });
            }}
          ></SendMes>
        )}
      </div>

      {showValid && (
        <ModalBase visible={showValid} onClose={() => setShowValid(false)}>
          <div className="flex flex-col w-full text-center cursor-pointer">
            <p
              onClick={handleDeleteConversation}
              className="w-full p-3 font-semibold text-red-500 border border-transparent border-b-slate-300"
            >
              Delete Conversation
            </p>

            <p className="p-3" onClick={() => setShowValid(false)}>
              Cancel
            </p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};

export default RightSide;
