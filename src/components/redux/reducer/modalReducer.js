const { GLOBAL_TYPES } = require("../actions/globalAction");

const modalReducer = (state = false, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.MODAL:
      return action.payload;
    default:
      return state;
  }
};
export default modalReducer;
