import { combineReducers, configureStore } from "@reduxjs/toolkit";
import keywordReducer from "./reducers/search";
import themeReducer from "./reducers/darkmode";
import stockReducer from "./reducers/stockmode";

import sidebarReducer from "./reducers/sidebar";

const rootReducer = combineReducers({
  keyword: keywordReducer,
  theme: themeReducer,
  stock: stockReducer,
  sidebar: sidebarReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
