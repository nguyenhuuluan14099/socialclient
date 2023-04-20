import { configureStore, combineReducers } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
const reducer = combineReducers({
  global: globalSlice,
});
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

export default store;
