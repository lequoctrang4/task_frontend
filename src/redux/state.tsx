import { createSlice } from "@reduxjs/toolkit";

const state = createSlice({
  name: "statePage",
  initialState: {
    state: "Dashboard",
  },
  reducers: {
    setState: (state, action) => {
      state.state = action.payload.state;
    },
  },
});
export const setState = state.actions.setState;
export default state.reducer;
