import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer";
import authReducer from "./Account/authReducer";
export const store = configureStore({
  reducer: {
    account: accountReducer,
    auth: authReducer,
  },
});
export default store;