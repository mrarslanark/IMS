import { CategoryFieldType } from "./../../screens/AddCategory/CategoryFieldList";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type Category = {
  id: string;
  title: string;
  fields: CategoryFieldType[];
};

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    insertCategory: (
      state: CategoriesState,
      action: PayloadAction<Category>
    ) => {
      state.categories.push(action.payload);
    },
    deleteACategory: (
      state: CategoriesState,
      actions: PayloadAction<string>
    ) => {
      state.categories = state.categories.filter(
        (item) => item.id !== actions.payload
      );
    },
  },
});

export const { insertCategory, deleteACategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
