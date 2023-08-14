const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (userId) => userId !== action.payload
          ),
        },
      };
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username || state.user.username,
          desc: action.desc || state.user.desc,
          city: action.city || state.user.city,
          profilePicture: action.profilePicture || state.user.profilePicture,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default AuthReducer;
