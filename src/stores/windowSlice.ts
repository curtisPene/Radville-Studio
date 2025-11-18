import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
  name: "window",
  initialState: {
    width: 0,
    height: 0,
    headerHeight: 0,
  },
  reducers: {
    setWindowDimensions: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.headerHeight = action.payload.headerHeight;
    },
  },
});

export const { setWindowDimensions } = windowSlice.actions;
export default windowSlice.reducer;
