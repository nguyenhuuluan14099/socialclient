export const EXPLORE_TYPES = {
  LOADING_EXPLORE: "LOADING_EXPLORE",
  GET_POSTS_EXPLORE: "GET_POSTS_EXPLORE",
  UPDATE_POSTS_EXPLORE: "UPDATE_POSTS_EXPLORE",
};

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false,
};
const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPLORE_TYPES.LOADING_EXPLORE:
      return {
        ...state,
        loading: action.payload,
      };
    case EXPLORE_TYPES.GET_POSTS_EXPLORE:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    case EXPLORE_TYPES.UPDATE_POSTS_EXPLORE:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1,
      };
    default:
      return state;
  }
};
export default exploreReducer;
