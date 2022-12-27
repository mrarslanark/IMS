import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootDrawerParamList = {
  Dashboard: {} | undefined;
  Categories: {} | undefined;
};

export type CategoriesStackParamList = {
  CategoryList: {} | undefined;
  AddCategory: {} | undefined;
};

// Dashboard Screen Types
export type DashboardProps = NativeStackScreenProps<
  RootDrawerParamList,
  "Dashboard"
>;

// Category Screen Types
export type CategoryListProps = NativeStackScreenProps<
  CategoriesStackParamList,
  "CategoryList"
>;
export type AddCategoryProps = NativeStackScreenProps<
  CategoriesStackParamList,
  "AddCategory"
>;
