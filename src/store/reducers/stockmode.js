import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockMode: JSON.parse(localStorage.getItem("stockmode")) || false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    toggleStockMode: (state) => {
      state.stockMode = !state.stockMode;
    },
  },
});

export const { toggleStockMode } = stockSlice.actions;

export default stockSlice.reducer;
