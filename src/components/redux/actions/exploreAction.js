import { getDataApi } from "utils/fetchData";
import { EXPLORE_TYPES } from "../reducer/exploreReducer";

export const getPostExplore = (token) => async (dispatch) => {
  try {
    dispatch({ type: EXPLORE_TYPES.LOADING_EXPLORE, payload: true });
    const res = await getDataApi("postExplore", token);
    dispatch({ type: EXPLORE_TYPES.GET_POSTS_EXPLORE, payload: res.data });
    dispatch({ type: EXPLORE_TYPES.LOADING_EXPLORE, payload: false });
  } catch (error) {
    console.log(error);
  }
};
