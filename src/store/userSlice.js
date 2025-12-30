import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],          // all registered users
  currentUser: null,  // logged-in user
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // signupZ
    signup: (state, action) => {
      state.users.push(action.payload);
    },

    // login
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
    },

    // Forgot Password
    updatePassword: (state, action) => {
      const { email, password } = action.payload;

      // update in users array
      const user = state.users.find(u => u.email === email);
      if (user) {
        user.password = password;
      }

      // update current session user is same
      if (state.currentUser?.email === email) {
        state.currentUser.password = password;
      }
    },

    // logout
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  signup,
  login,
  updatePassword,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
