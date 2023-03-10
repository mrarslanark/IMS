import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import images from "../../constants/images";
import Routes from "../../constants/routes";
import { generateLatestTimestamp } from "../../constants/utils";
import { CategoryListProps } from "../../navigator";
import { AppDispatch, RootState } from "../../store";
import { Category, deleteACategory } from "../../store/slices/categories";
import { deleteAllCategoryItems } from "../../store/slices/data";
import styles from "./styles";

const CategoryList: React.FC<CategoryListProps> = ({ navigation }) => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.root.categories.categories
  );

  function handleNavigation() {
    navigation.navigate(Routes.AddCategory, { action: "add" });
  }

  function handleEditNavigation(payload: Category) {
    navigation.navigate(Routes.AddCategory, { ...payload, action: "edit" });
  }

  if (categories.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Image source={images.emptyImage} style={styles.emptyImage} />
        <Text style={styles.emptyTitle}>No Categories Added Yet</Text>
        <Button mode="contained-tonal" onPress={handleNavigation}>
          ADD A CATEGORY
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.addButtonContainer}
      >
        <Text style={styles.addText}>+ Add a Category</Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 16 }}
        style={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            handleEditNavigation={handleEditNavigation}
          />
        )}
        ItemSeparatorComponent={() => (
          <Divider style={styles.categoryDivider} />
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
  const data = useSelector((state: RootState) => state.root.data.data);
  const totalItems = data.filter((data) => data.id === item.id);

  function handleCategoryDelete() {
    dispatch(deleteACategory(item.id));
    dispatch(deleteAllCategoryItems(item.id));
  }

  function showAlert() {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete the ${item.title} category? You won\'t be able to retrieve its fields and all concerning data will be deleted`,
      [
        { text: "Cancel" },
        { text: "Delete", onPress: handleCategoryDelete, style: "destructive" },
      ]
    );
  }

  return (
    <View style={{ padding: 16, backgroundColor: "white", borderRadius: 12 }}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.timestamp}>
        {generateLatestTimestamp(item.createdAt!, item.updatedAt)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 12,
        }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.countText}>{item?.fields?.length ?? 0}</Text>
          <Text style={styles.attributeLabel}>Attributes</Text>
        </View>
        <View style={styles.totalItemsContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 6 }}>
            {totalItems.length}
          </Text>
          <Text style={{ color: "gray", textAlign: "center" }}>Items</Text>
        </View>
      </View>
      <Divider style={{ marginBottom: 12 }} />
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
