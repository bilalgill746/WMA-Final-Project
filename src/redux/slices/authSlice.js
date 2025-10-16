import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userProfile: null,
    suggestedUsers: [],
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addBookmark: (state, action) => {
      if (state.user && !state.user.bookmarks.includes(action.payload)) {
        state.user.bookmarks.push(action.payload);
      }
    },
    removeBookmark: (state, action) => {
      if (state.user) {
        state.user.bookmarks = state.user.bookmarks.filter(
          (id) => id !== action.payload
        );
      }
    },
    followUser: (state, action) => {
      if (state.user && !state.user.following.includes(action.payload)) {
        state.user.following.push(action.payload);
      }
    },
    unfollowUser: (state, action) => {
      if (state.user) {
        state.user.following = state.user.following.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});
export const {
  setAuthUser,
  setUserProfile,
  setSuggestedUsers,
  setSelectedUser,
  addBookmark,
  removeBookmark,
  followUser,
  unfollowUser,
} = authSlice.actions;
export default authSlice.reducer;
