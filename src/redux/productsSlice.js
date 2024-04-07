import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], groups: [] },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (i) => i.itemId === action.payload.itemId
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    addGroup: (state, action) => {
      state.groups.push({ id: action.payload.id, name: action.payload.name });
    },
  },
});

export const { addProduct, updateProduct, addGroup } = productsSlice.actions;

export const selectProductsList = (state) => state.products.items;
export const selectGroupsList = (state) => state.products.groups;

export default productsSlice.reducer;
