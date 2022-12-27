import "react-native-get-random-values";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { Button, Divider, Switch, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { DynamicItemAddProps } from "../../navigator";
import { Category } from "../../store/slices/categories";
import { Data, insertData } from "../../store/slices/data";
import { CategoryFieldType } from "../AddCategory/CategoryFieldList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const DynamicItemAdd: React.FC<DynamicItemAddProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const params: Readonly<Category | undefined> = route.params;
  const [fields, setFields] = useState<CategoryFieldType[] | undefined>(
    params?.fields
  );

  function handleAddItem() {
    if (!fields || !params) {
      return;
    }
    const emptyFields = fields.filter((item) => item.value === undefined);
    if (emptyFields.length > 0) {
      Alert.alert(
        "Field Empty",
        "Some of the field(s) are empty, kindly enter before proceeding"
      );
      return;
    }

    const completeFields = fields.map((item) => {
      return {
        name: item.name,
        title: item.label,
        type: item.type,
        value: item.value,
      };
    });

    const model: Data = {
      categoryId: params.id,
      createdAt: new Date().toISOString(),
      id: nanoid(),
      updatedAt: new Date().toISOString(),
      fields: completeFields,
    };

    dispatch(insertData(model));
    navigation.pop();
  }

  function updateState(id: string, text: string) {
    setFields((prevState: CategoryFieldType[] | undefined) => {
      return prevState?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value: text,
          };
        } else {
          return item;
        }
      });
    });
  }

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Category: {params?.title ?? ""}
      </Text>
      {fields && fields.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={params?.fields}
          style={{ flex: 1 }}
          renderItem={({ item, index }) => {
            if (item.type === "text" || item.type === "number") {
              return <InputType updateState={updateState} item={item} />;
            } else if (item.type === "boolean") {
              return <SwitchType updateState={updateState} item={item} />;
            } else if (item.type === "date") {
              return <DateType updateState={updateState} item={item} />;
            } else {
              return null;
            }
          }}
          ItemSeparatorComponent={() => (
            <Divider
              style={{ marginVertical: 6, backgroundColor: "transparent" }}
            />
          )}
        />
      ) : null}
      <Button
        mode="contained"
        style={{ marginVertical: 12 }}
        onPress={handleAddItem}
      >
        Add Item
      </Button>
    </View>
  );
};

const InputType = ({ item, updateState }: any) => {
  const [text, setText] = useState("");

  function handleTextChange(value: string) {
    setText(value);
    updateState(item.id, value);
  }

  return (
    <TextInput
      label={item.name}
      onChangeText={handleTextChange}
      placeholder={item.label}
      keyboardType={item.type === "number" ? "number-pad" : "default"}
      value={text}
    />
  );
};

const SwitchType = ({ item, updateState }: any) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    updateState(item.id, !isSwitchOn);
    setIsSwitchOn((prevState: boolean) => !prevState);
  };

  return (
    <View
      style={{
        padding: 12,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "600" }}>{item.name}</Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: "lightgray",
          borderRadius: 100,
        }}
      >
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
};

const DateType = ({ item, updateState }: any) => {
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  function togglePicker() {
    setOpen((prevState: boolean) => !prevState);
  }

  const onDismissSingle = React.useCallback(() => {
    togglePicker();
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      togglePicker();
      setDate(params.date);
      updateState(item.id, moment(params.date).toISOString());
    },
    [setOpen, setDate]
  );

  return (
    <View style={{ padding: 12, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{item.name}</Text>
        <Button mode="text" icon={"calendar"} onPress={togglePicker}>
          {date ? moment(date).format("ddd DD YYYY") : "Pick a Date"}
        </Button>
      </View>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
    </View>
  );
};

export default DynamicItemAdd;
