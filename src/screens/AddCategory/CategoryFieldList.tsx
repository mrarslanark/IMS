import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import {
  IconButton,
  List,
  SegmentedButtons,
  TextInput,
  ToggleButton,
} from "react-native-paper";

export type CategoryFieldType = {
  id: string;
  type: string;
  name: string;
  value?: string | boolean;
};

const categories = [
  {
    value: "text",
    icon: "format-text",
    type: "text",
  },
  {
    value: "number",
    icon: "numeric",
    type: "number",
  },
  {
    value: "checkbox",
    icon: "checkbox-marked-outline",
    type: "checkbox",
  },
  {
    value: "date",
    icon: "calendar-range",
    type: "date",
  },
];

type CategoryFieldListProps = {
  item: CategoryFieldType;
  handleFieldDelete: (id: string) => void | undefined;
  handleFieldDetailsUpdate: (data: CategoryFieldType) => void | undefined;
  fields: CategoryFieldType[];
};

const CategoryFieldList: React.FC<CategoryFieldListProps> = ({
  item,
  handleFieldDelete,
  handleFieldDetailsUpdate,
  fields,
}) => {
  const [type, setType] = useState<string>(item.type);
  const [fieldName, setFieldName] = useState<string>(item.name ?? "");

  function handleFieldName(name: string) {
    setFieldName(name);
    handleFieldDetailsUpdate({
      id: item.id,
      name,
      type,
    });
  }

  function handleType(selectedType: any) {
    setType(selectedType);
    handleFieldDetailsUpdate({
      id: item.id,
      name: fieldName,
      type: selectedType,
      value: selectedType === "boolean" ? false : undefined,
    });
  }

  return (
    <View
      style={{
        padding: 12,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={handleFieldName}
          label={"Attribute Name"}
          placeholder={"Attribute Name"}
          value={fieldName}
          style={{ flex: 1 }}
        />
        {fields.length > 1 ? (
          <IconButton
            icon="delete"
            iconColor={"#bb2124"}
            style={{
              borderRadius: 6,
            }}
            size={24}
            onPress={() => handleFieldDelete(item.id)}
          />
        ) : null}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {categories.map((category) => {
          return (
            <ToggleButton
              key={category.icon}
              icon={category.icon}
              value={category.value}
              status={category.type === type ? "checked" : "unchecked"}
              onPress={() => handleType(category.value)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default CategoryFieldList;
