import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
        console.log("entered updateExpense")
      const i = state.expenses.findIndex(e => e.id === action.payload.id);
      if (i !== -1) state.expenses[i] = action.payload;
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
