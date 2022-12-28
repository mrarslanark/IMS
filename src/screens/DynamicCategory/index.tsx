import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Routes from "../../constants/routes";
import { useSelector } from "react-redux";
import { Data } from "../../store/slices/data";
import { RootState } from "../../store";
import { Category } from "../../store/slices/categories";
import { FlatList } from "react-native-gesture-handler";
import { Divider, List } from "react-native-paper";
import moment from "moment";
import { TIMESTAMP } from "../../constants/utils";

const DyanmicCategory: React.FC = ({ navigation, route }: any) => {
  const params: Readonly<Category | undefined> = route.params;

  function handleNavigation() {
    navigation.navigate(Routes.DynamicItemAdd, route.params);
  }

  const data: Data[] = useSelector((state: RootState) => state.root.data.data);

  if (!params) {
    return null;
  }

  const filtered = data.filter((item) => item.categoryId === params?.id);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>+ Add an Item</Text>
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
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ flex: 1 }}>{item.name}</Text>
                      <Text>
                        {item.type === "boolean"
                          ? item.value
                            ? "Yes"
                            : "No"
                          : item.type === "date"
                          ? moment(item.value).format(TIMESTAMP)
                          : item.value}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default DyanmicCategory;
