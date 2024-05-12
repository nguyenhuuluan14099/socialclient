import { DeleteData, EditData } from "../actions/globalAction";

export const MESSAGE_TYPES = {
  ADD_USER: "ADD_USER",
  ADD_MESSAGE: "ADD_MESSAGE",
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_MESSAGES: "GET_MESSAGES",
  UPDATE_MESSAGES: "UPDATE_MESSAGES",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  DELETE_CONVERSATION: "DELETE_CONVERSATION",
  CHECK_ONLINE_OFFLINE: "CHECK_ONLINE_OFFLINE",
};
const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  firstLoad: false,
};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_TYPES.ADD_USER:
      if (state.users.every((user) => user._id !== action.payload._id)) {
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      }
      return state;
    case MESSAGE_TYPES.ADD_MESSAGE:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload.recipient ||
          item._id === action.payload.sender
            ? {
                ...item,
                messages: [...item.messages, action.payload],
                result: item.result + 1,
              }
            : item
        ),
        users: state.users.map((user) =>
          user._id === action.payload.sender ||
          user._id === action.payload.recipient
            ? {
                ...user,

                text: action.payload.text,
                media: action.payload.media,
                createdAt: action.payload.createdAt,
              }
            : user
        ),
      };
    case MESSAGE_TYPES.GET_CONVERSATION:
      return {
        ...state,
        resultUsers: action.payload.result,
        users: action.payload.newArr,
        firstLoad: true,
      };
    case MESSAGE_TYPES.GET_MESSAGES:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case MESSAGE_TYPES.UPDATE_MESSAGES:
      return {
        ...state,
        data: EditData(state.data, action.payload._id, action.payload),
      };
    case MESSAGE_TYPES.DELETE_MESSAGE:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id
            ? { ...item, messages: action.payload.newData }
            : item
        ),
      };
    case MESSAGE_TYPES.DELETE_CONVERSATION:
      return {
        ...state,
        users: DeleteData(state.users, action.payload),
        data: DeleteData(state.data, action.payload),
      };
    case MESSAGE_TYPES.CHECK_ONLINE_OFFLINE:
      return {
        ...state,
        users: state.users.map((user) =>
          action.payload.includes(user._id)
            ? { ...user, online: true }
            : { ...user, online: false }
        ),
      };
    default:
      return state;
  }
};
export default messageReducer;
