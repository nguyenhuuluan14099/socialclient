export const REPLY_TYPES = {
  GET_REPLY: "GET_REPLY",
};

const replyCmtReducer = (state = null, action) => {
  switch (action.type) {
    case REPLY_TYPES.GET_REPLY:
      return action.payload;

    default:
      return state;
  }
};
export default replyCmtReducer;
