const { EditData } = require("../actions/globalAction");
const { POST_TYPES } = require("../actions/postAction");

const initialState = [];
const detailPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST:
      return [...state, action.payload];
    case POST_TYPES.UPDATE_POST:
      return EditData(state, action.payload._id, action.payload);

    default:
      return state;
  }
};
export default detailPostReducer;
