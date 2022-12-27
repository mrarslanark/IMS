import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { IconButton, List, TextInput } from "react-native-paper";

export type CategoryFieldType = {
  id: string;
  type: string;
  name: string;
  label: string;
  icon: string;
  value?: string | boolean | undefined;
};

type FieldItemType = {
  id: string;
  value: string;
  title: string;
  icon: string;
};

const categoryTypes: FieldItemType[] = [
  { id: "0", value: "string", title: "Text", icon: "format-text" },
  { id: "1", value: "number", title: "Number", icon: "numeric" },
  {
    id: "2",
    value: "boolean",
    title: "Checkbox",
    icon: "checkbox-marked-outline",
  },
  { id: "3", value: "date", title: "Date", icon: "calendar-range" },
];

type CategoryFieldListProps = {
  item: CategoryFieldType;
  handleFieldDelete: (id: string) => void | undefined;
  handleFieldDetailsUpdate: (data: CategoryFieldType) => void | undefined;
};

const CategoryFieldList: React.FC<CategoryFieldListProps> = ({
  item,
  handleFieldDelete,
  handleFieldDetailsUpdate,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState<string>(item.type);
  const [icon, setIcon] = useState<string>(item.icon);
  const [label, setLabel] = useState<string>(item.label);
  const [fieldName, setFieldName] = useState<string>("");
  const fieldListRef = useRef<FlatList>(null);

  function toggleList() {
    setExpanded((prevState: boolean) => !prevState);
  }

  function handleFieldName(name: string) {
    setFieldName(name);
    handleFieldDetailsUpdate({
      id: item.id,
      icon,
      label,
      name,
      type,
    });
  }

  function handleType(selectedItem: FieldItemType) {
    toggleList();
    setType(selectedItem.value);
    setIcon(selectedItem.icon);
    setLabel(selectedItem.title);
    handleFieldDetailsUpdate({
      id: item.id,
      icon: selectedItem.icon,
      label: selectedItem.title,
      name: fieldName,
      type: selectedItem.value,
      value: selectedItem.value === "boolean" ? false : undefined,
    });
  }

  return (
    <View
      style={{
        padding: 6,
        backgroundColor: "white",
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <TextInput
          onChangeText={handleFieldName}
          label={"Field Name"}
          placeholder={"Field Name"}
          value={fieldName}
          style={{ flex: 1 }}
        />
        <IconButton
          icon="delete"
          iconColor={"#bb2124"}
          style={{
            borderRadius: 6,
          }}
          size={36}
          onPress={() => handleFieldDelete(item.id)}
        />
      </View>
      <List.Accordion
        title={label ?? "Select a Type"}
        expanded={expanded}
        onPress={toggleList}
        right={(props) => <List.Icon {...props} icon={icon} />}
      >
        <FlatList
          ref={fieldListRef}
          scrollEnabled={false}
          data={categoryTypes}
          keyExtractor={(item) => item.id}
          renderItem={(props) => {
            return (
              <List.Item
                onPress={() => handleType(props.item)}
                style={{ backgroundColor: "white" }}
                title={props.item.title}
                left={(iconProps) => (
                  <List.Icon {...iconProps} icon={props.item.icon} />
                )}
              />
            );
          }}
        />
      </List.Accordion>
    </View>
  );
};

export default CategoryFieldList;
