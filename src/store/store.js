import { combineReducers, configureStore } from "@reduxjs/toolkit";
import keywordReducer from "./reducers/search";
import themeReducer from "./reducers/darkmode";
import stockReducer from "./reducers/stockmode";

const rootReducer = combineReducers({
  keyword: keywordReducer,
  theme: themeReducer,
  stock: stockReducer
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
