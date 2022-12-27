import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Category } from "../store/slices/categories";

export type RootDrawerParamList = {
  Dashboard: {} | undefined;
  Categories: {} | undefined;
};

export type RootStackParamList = {
  CategoryList: {} | undefined;
  AddCategory: {} | undefined;
  DrawerNavigator: {} | undefined;
  DynamicItemAdd: Category | undefined;
};

// Dashboard Screen Types
export type DashboardProps = NativeStackScreenProps<
  RootDrawerParamList,
  "Dashboard"
>;

// Category Screen Types
export type CategoryListProps = NativeStackScreenProps<
  RootStackParamList,
  "CategoryList"
>;
export type AddCategoryProps = NativeStackScreenProps<
  RootStackParamList,
  "AddCategory"
>;
export type DynamicItemAddProps = NativeStackScreenProps<
  RootStackParamList,
  "DynamicItemAdd"
>;
