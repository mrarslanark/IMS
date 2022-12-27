import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type DataField = {
  name: string;
  value: any;
  type: string;
  title: string;
};

export type Data = {
  id: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  fields: DataField[];
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
  },
});

export const { insertData, deleteADataItem, deleteAllCategoryItems } =
  dataSlice.actions;
export default dataSlice.reducer;
