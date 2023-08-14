import FriendOnline from "./FriendOnline";
import PostList from "./PostList";

const Feed = ({ socket, currentUser }) => {
  return (
    <div className="my-16 md:my-2  feed  mr-[50px] w-full max-w-[500px] flex-4  ">
      <FriendOnline currentUser={currentUser} socket={socket}></FriendOnline>
      <PostList currentUser={currentUser} socket={socket}></PostList>
    </div>
  );
};

export default Feed;
