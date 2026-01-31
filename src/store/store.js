import { combineReducers, configureStore } from "@reduxjs/toolkit";
import keywordReducer from "./reducers/search";
import themeReducer from "./reducers/darkmode";

const rootReducer = combineReducers({
  keyword: keywordReducer,
  theme: themeReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
