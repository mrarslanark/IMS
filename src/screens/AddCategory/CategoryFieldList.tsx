import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  IconButton,
  TextInput,
  ToggleButton,
} from "react-native-paper";
import { generateDefaultValue } from "../../constants/utils";
import styles from "./styles";

export type CategoryFieldType = {
  id: string;
  type: string;
  name: string;
  value?: any;
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
  handleSetTitle: (selectedTitle: {
    id: string;
    value: string;
  }) => void | undefined;
  selectedTitle: { id: string; value: string };
  fields: CategoryFieldType[];
};

const CategoryFieldList: React.FC<CategoryFieldListProps> = ({
  item,
  handleFieldDelete,
  handleFieldDetailsUpdate,
  handleSetTitle,
  fields,
  selectedTitle,
}) => {
  const [type, setType] = useState<string>(item.type);
  const [fieldName, setFieldName] = useState<string>(item.name ?? "");

  function handleFieldName(name: string) {
    setFieldName(name);
    handleFieldDetailsUpdate({
      id: item.id,
      name,
      type,
      value: generateDefaultValue(type),
    });
  }

  function handleType(selectedType: any) {
    setType(selectedType);
    handleFieldDetailsUpdate({
      id: item.id,
      name: fieldName,
      type: selectedType,
      value: generateDefaultValue(selectedType),
    });
  }

  return (
    <View style={styles.attributeContainer}>
      <View style={styles.attributeInputContainer}>
        <TextInput
          onChangeText={handleFieldName}
          label={"Attribute Name"}
          placeholder={"Attribute Name"}
          value={fieldName}
          style={styles.attributeInput}
        />
        {fields.length > 1 ? (
          <IconButton
            icon="delete"
            iconColor={"#bb2124"}
            style={styles.attributeDeleteIcon}
            size={24}
            onPress={() => handleFieldDelete(item.id)}
          />
        ) : null}
      </View>
      <View style={styles.attributeTypeSelectionContainer}>
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
        <Button
          mode="contained-tonal"
          onPress={() => handleSetTitle({ id: item.id, value: fieldName })}
          disabled={
            selectedTitle.value === fieldName && selectedTitle.id === item.id
          }
        >
          {selectedTitle.value === fieldName && selectedTitle.id === item.id
            ? "Selected as Title"
            : "Select as Title"}
        </Button>
      </View>
    </View>
  );
};

export default CategoryFieldList;
