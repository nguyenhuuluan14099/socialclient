import { EditData } from "../actions/globalAction";

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFY: "DELETE_ALL_NOTIFY",
};
const initialState = {
  data: [],
  sound: true,
  loading: false,
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_TYPES.GET_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    case NOTIFY_TYPES.CREATE_NOTIFY:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case NOTIFY_TYPES.REMOVE_NOTIFY:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case NOTIFY_TYPES.UPDATE_NOTIFY:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    case NOTIFY_TYPES.UPDATE_SOUND:
      return {
        ...state,
        sound: action.payload,
      };
    case NOTIFY_TYPES.DELETE_ALL_NOTIFY:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
export default notifyReducer;
