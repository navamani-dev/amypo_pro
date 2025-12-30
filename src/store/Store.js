import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import expenseReducer from "./ExpenseSlice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer, 
  },
});

export default Store;
