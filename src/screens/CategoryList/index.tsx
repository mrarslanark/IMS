import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Routes from "../../constants/routes";
import { CategoryListProps } from "../../navigator";
import { AppDispatch, RootState } from "../../store";
import { Category, deleteACategory } from "../../store/slices/categories";
import styles from "./styles";

const CategoryList: React.FC<CategoryListProps> = ({ navigation }) => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.root.categories.categories
  );

  function handleNavigation() {
    navigation.navigate(Routes.AddCategory);
  }

  function handleEditNavigation(payload: Category) {
    navigation.navigate(Routes.AddCategory);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.addButtonContainer}
      >
        <Text>+ Add a Category</Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 16 }}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            handleEditNavigation={handleEditNavigation}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider
            style={{ marginVertical: 6, backgroundColor: "transparent" }}
          />
        )}
      />
    </View>
  );
};

type CategoryItemProps = {
  item: Category;
  handleEditNavigation: (payload: Category) => void | undefined;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  item,
  handleEditNavigation,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  function handleCategoryDelete() {
    dispatch(deleteACategory(item.id));
  }

  function showAlert() {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete the ${item.title} category? You won\'t be able to retrieve its fields`,
      [
        { text: "Cancel" },
        { text: "Delete", onPress: handleCategoryDelete, style: "destructive" },
      ]
    );
  }

  return (
    <View style={{ padding: 16, backgroundColor: "white" }}>
      <Text
        style={{
          fontSize: 18,
          color: "purple",
          fontWeight: "bold",
          textTransform: "uppercase",
          borderRadius: 8,
        }}
      >
        {item.title}
      </Text>
      <Text
        style={{ color: "gray", fontSize: 12, marginTop: 6, marginBottom: 12 }}
      >
        {item.fields.map((item) => item.name).join(", ")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={showAlert}
          style={{
            flex: 1,
            height: 37,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 17, 0, 0.05)",
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "rgba(255, 17, 0, 0.8)" }}>
            DELETE
          </Text>
        </TouchableOpacity>
        <Divider style={{ marginHorizontal: 4 }} />
        <TouchableOpacity
          onPress={() => handleEditNavigation(item)}
          style={{
            flex: 1,
            height: 37,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 76, 255, 0.05)",
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "rgba(0, 76, 255, 0.8)" }}>
            EDIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryList;
