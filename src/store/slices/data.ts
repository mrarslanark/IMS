import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type DataField = {
  name: string;
  value: any;
  type: string;
};

export type Data = {
  id: string;
  createdAt?: string;
  updatedAt: string;
  categoryId: string;
  fields: DataField[];
  selectedTitle: {
    id: string;
    value: string;
  };
};

interface DataState {
  data: Data[];
}

const initialState: DataState = {
  data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    insertData: (state: DataState, action: PayloadAction<Data>) => {
      state.data.push(action.payload);
    },
    updateData: (state: DataState, action: PayloadAction<Data>) => {
      state.data = state.data.map((item) => {
        return item.id === action.payload.id
          ? { ...item, ...action.payload }
          : item;
      });
    },
    deleteADataItem: (state: DataState, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    deleteAllCategoryItems: (
      state: DataState,
      action: PayloadAction<string>
    ) => {
      state.data = state.data.filter(
        (item) => item.categoryId !== action.payload
      );
    },
    clearAllData: (state) => {
      state.data = [];
    },
  },
});

export const {
  insertData,
  deleteADataItem,
  deleteAllCategoryItems,
  updateData,
  clearAllData,
} = dataSlice.actions;
export default dataSlice.reducer;
