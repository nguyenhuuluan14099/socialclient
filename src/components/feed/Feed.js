import FriendOnline from "./FriendOnline";
import Header from "./Header";
import PostList from "./PostList";

const Feed = () => {
  return (
    <div className="m-3   laptop:mt-2  feed w-full max-w-[370px] laptop:max-w-[650px] mx-auto  flex-4  ">
      <Header></Header>
      <FriendOnline></FriendOnline>
      <PostList></PostList>
    </div>
  );
};

export default Feed;
