import moment from "moment";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import images from "../../constants/images";
import Routes from "../../constants/routes";
import { TIMESTAMP } from "../../constants/utils";
import { AppDispatch, RootState } from "../../store";
import { Data, deleteADataItem } from "../../store/slices/data";

const DyanmicCategory: React.FC = ({ navigation, route }: any) => {
  const params: { categoryId: string } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.root.categories.categories
  );

  function handleNavigation() {
    const category = categories.find((item) => item.id === params.categoryId);
    const bundle = {
      ...category,
      action: "add",
    };
    navigation.navigate(Routes.DynamicItemAdd, bundle);
  }

  function handleEditNavigation(item: any) {
    navigation.navigate(Routes.DynamicItemAdd, {
      ...item,
      action: "edit",
    });
  }

  const data: Data[] = useSelector((state: RootState) => state.root.data.data);
  if (!params) {
    return null;
  }

  const filtered = data.filter((item) => item.categoryId === params.categoryId);

  function handleDeleteItem(itemId: string) {
    dispatch(deleteADataItem(itemId));
  }

  function showAlert(itemId: string) {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to delete the selected item?`,
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: () => handleDeleteItem(itemId),
          style: "destructive",
        },
      ]
    );
  }

  if (filtered.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={images.emptyImage}
          style={{ width: "40%", height: "40%", resizeMode: "contain" }}
        />
        <Text style={{ marginBottom: 24, fontSize: 18, fontWeight: "bold" }}>
          No Items Added Yet
        </Text>
        <Button mode="contained-tonal" onPress={handleNavigation}>
          ADD AN ITEM
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "rgba(18, 179, 61, 0.1)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#212121",
          }}
        >
          + Add an Item
        </Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        keyExtractor={(item) => item.id}
        data={filtered}
        ItemSeparatorComponent={() => (
          <Divider
            style={{
              marginVertical: 4,
              backgroundColor: "transparent",
            }}
          />
        )}
        renderItem={({ item }) => {
          return (
            <View style={{ padding: 16, backgroundColor: "white" }}>
              <Text style={{ fontSize: 24, marginBottom: 12 }}>
                {item.fields.find(
                  (fieldItem) => fieldItem.name === item.selectedTitle.value
                )?.value ?? ""}
              </Text>
              <FlatList
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <Divider
                    style={{
                      marginVertical: 4,
                      backgroundColor: "transparent",
                    }}
                  />
                )}
                data={item.fields}
                keyExtractor={(item) => item.name}
                renderItem={(props) => <DataItem item={props.item} />}
              />
              <Divider style={{ marginVertical: 16 }} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => showAlert(item.id)}
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
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "rgba(255, 17, 0, 0.8)",
                    }}
                  >
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
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "rgba(0, 76, 255, 0.8)",
                    }}
                  >
                    EDIT
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const DataItem = ({ item }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ flex: 1 }}>{item.name}</Text>
      <Text>
        {item.type === "checkbox"
          ? item.value
            ? "Yes"
            : "No"
          : item.type === "date"
          ? moment(item.value).format(TIMESTAMP)
          : item.value}
      </Text>
    </View>
  );
};

export default DyanmicCategory;
