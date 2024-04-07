import { createSlice } from "@reduxjs/toolkit";
import { calculateInvoiceTotal } from "../utils/calculateInvoiceTotal";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateItem: (state, action) => {
      const { itemId, updatedItem } = action.payload;
      state.forEach((invoice, invoiceIndex) => {
        let itemEdited = false;

        const updatedGroups = invoice.groups.map((group) => ({
          ...group,
          items: group.items.map((item) => {
            if (item.itemId === itemId) {
              itemEdited = true;
              return { ...item, ...updatedItem };
            }
            return item;
          }),
        }));

        if (itemEdited) {
          const { subTotal, taxAmount, discountAmount, total } =
            calculateInvoiceTotal(
              updatedGroups,
              invoice.taxRate,
              invoice.discountRate
            );

          state[invoiceIndex] = {
            ...invoice,
            groups: updatedGroups,
            subTotal,
            taxAmount,
            discountAmount,
            total,
          };
        }
      });
    },
  },
});

export const { addInvoice, deleteInvoice, updateInvoice, updateItem } =
  invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
