const { GLOBAL_TYPES } = require("../actions/globalAction");

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.LOADING:
      return action.payload;
    default:
      return state;
  }
};
export default loadingReducer;
