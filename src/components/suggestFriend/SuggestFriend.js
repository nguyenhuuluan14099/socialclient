import FriendItem from "components/friend/FriendItem";
import UserLoading from "components/loading/UserLoading";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataApi } from "utils/fetchData";

const SuggestFriend = ({ totalView }) => {
  const { auth } = useSelector((state) => state);
  const [suggestUser, setSuggestUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDataApi("suggestUser", auth.token).then((res) => {
      setSuggestUser(res.data.users);
      setLoading(false);
    });
  }, [auth.token]);

  return (
    <>
      {!loading && suggestUser.length === 0 && <p>No users</p>}
      {suggestUser.length > 0 &&
        suggestUser.slice(0, totalView).map((item) => (
          <FriendItem info={item.username} key={item._id} story data={item}>
            View Profile
          </FriendItem>
        ))}
      {loading && suggestUser.length === 0 && (
        <div className="p-3">
          <UserLoading></UserLoading>
          <UserLoading></UserLoading>
          <UserLoading></UserLoading>
        </div>
      )}
    </>
  );
};

export default memo(SuggestFriend);
