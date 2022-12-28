import "react-native-get-random-values";
import moment from "moment";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, List, Switch, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { DynamicItemAddProps } from "../../navigator";
import { Category } from "../../store/slices/categories";
import { Data, insertData, updateData } from "../../store/slices/data";
import { CategoryFieldType } from "../AddCategory/CategoryFieldList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { TIMESTAMP } from "../../constants/utils";

const DynamicItemAdd: React.FC<DynamicItemAddProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  const params: any = route.params;
  const [data, setData] = useState(params);
  const [fields, setFields] = useState<CategoryFieldType[] | undefined>(
    data?.fields
  );

  function handleAddItem() {
    if (!fields || !data) {
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
        id: item.id,
        name: item.name,
        type: item.type,
        value: item.value,
      };
    });

    if (params.action === "add") {
      const model: Data = {
        ...data,
        categoryId: data.id,
        createdAt: new Date().toISOString(),
        id: nanoid(),
        updatedAt: new Date().toISOString(),
        fields: completeFields,
      };
      dispatch(insertData(model));
    } else {
      const model: Data = {
        ...data,
        categoryId: data.categoryId,
        id: data.id,
        updatedAt: new Date().toISOString(),
        fields: completeFields,
      };
      dispatch(updateData(model));
    }
    navigation.pop();
  }

  function updateState(id: string, value: any, type: string) {
    setFields((prevState: CategoryFieldType[] | undefined) => {
      return prevState?.map((item) => {
        return {
          ...item,
          value: item.id === id && item.type === type ? value : item.value,
        };
      });
    });
  }

  function handleBackNav() {
    navigation.pop();
  }

  function handleChangeTitle(id: string, name: string) {
    const model = {
      ...data,
      selectedTitle: {
        id,
        value: name,
      },
    };
    setData({ ...model });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 12,
            backgroundColor: "white",
            height: 50,
            padding: 16,
          }}
        >
          <Text style={{ fontSize: 14, color: "gray" }}>Category</Text>
          <Text style={{ fontSize: 14, fontWeight: "600" }}>
            {data?.title ?? ""}
          </Text>
        </View>
        <List.Accordion
          title={"Selected Title"}
          description={data.selectedTitle.value}
          expanded={expanded}
          onPress={handlePress}
        >
          <FlatList
            keyExtractor={(item) => item.id}
            data={fields}
            renderItem={({ item }) => {
              return (
                <List.Item
                  onPress={() => handleChangeTitle(item.id, item.name)}
                  right={(props) =>
                    item.name === data.selectedTitle.value ? (
                      <List.Icon {...props} icon="check" />
                    ) : null
                  }
                  title={item.name}
                  style={{ backgroundColor: "white" }}
                />
              );
            }}
            ItemSeparatorComponent={() => <Divider />}
          />
        </List.Accordion>
        {fields && fields.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={fields}
            style={{ flex: 1, marginTop: 12 }}
            renderItem={({ item }) => {
              if (item.type === "text" || item.type === "number") {
                return <InputType updateState={updateState} item={item} />;
              } else if (item.type === "checkbox") {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: 60,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            onPress={handleBackNav}
            style={{
              flex: 1,
              height: 37,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.4)",
                textTransform: "uppercase",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Divider style={{ marginHorizontal: 4 }} />
          <TouchableOpacity
            onPress={handleAddItem}
            style={{
              flex: 1,
              height: 37,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor:
                params?.action === "add"
                  ? "rgba(18, 179, 61, 0.1)"
                  : "rgba(0, 76, 255, 0.1)",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color:
                  params?.action === "add"
                    ? "rgba(18, 179, 61, 0.8)"
                    : "rgba(0, 76, 255, 0.8)",
                textTransform: "uppercase",
              }}
            >
              {params?.action === "add" ? "Add" : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const InputType = ({ item, updateState }: any) => {
  const [text, setText] = useState(item.value);

  function handleTextChange(value: string) {
    setText(value);
    updateState(item.id, value, item.type);
  }

  return (
    <TextInput
      label={item.name}
      onChangeText={handleTextChange}
      placeholder={item.name}
      keyboardType={item.type === "number" ? "number-pad" : "default"}
      value={text}
    />
  );
};

const SwitchType = ({ item, updateState }: any) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(item.value);

  const onToggleSwitch = () => {
    updateState(item.id, !isSwitchOn, item.type);
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
  const [date, setDate] = React.useState(
    moment(item.value).toDate() ?? undefined
  );
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
      updateState(item.id, moment(params.date).toISOString(), item.type);
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
          {date ? moment(date).format(TIMESTAMP) : "Pick a Date"}
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
