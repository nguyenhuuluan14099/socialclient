const { GLOBAL_TYPES } = require("../actions/globalAction");

const initialState = {};
const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.ERROR:
      return action.payload;
    default:
      return state;
  }
};
export default errorReducer;
