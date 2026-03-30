import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./client";

const initialState = {
  currentUser: null as User | null,
  isLoaded: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setAuthLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setCurrentUser, setAuthLoaded } = accountSlice.actions;
export default accountSlice.reducer;
