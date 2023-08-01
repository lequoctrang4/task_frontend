import { configureStore } from "@reduxjs/toolkit";
import state from "./state";
export const store = configureStore({
  reducer: {
    state: state,
  },
});
