import { createSlice } from "@reduxjs/toolkit";

export interface NavState {
  isOpen: boolean;
}

const initialState: NavState = {
  isOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    openNav: (state) => {
      state.isOpen = true;
    },
    closeNav: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openNav, closeNav } = navSlice.actions;
export default navSlice.reducer;
