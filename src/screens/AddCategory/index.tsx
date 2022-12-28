import { Formik } from "formik";
import React, { useState, useRef } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Divider,
  TextInput,
  HelperText,
  IconButton,
  MD3Colors,
  List,
} from "react-native-paper";
import styles from "./styles";

import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { CategoryFormValidation } from "../../constants/validations";
import { AddCategoryProps } from "../../navigator";
import CategoryFieldList, { CategoryFieldType } from "./CategoryFieldList";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import {
  Category,
  insertCategory,
  updateACategory,
} from "../../store/slices/categories";
import { AppDispatch } from "../../store";

type CategoryFormType = {
  title: string;
  selectedTitle: {
    id: string;
    value: string;
  };
};

const initialCategoryField: CategoryFieldType = {
  id: nanoid(),
  name: "",
  type: "text",
  value: "",
};

const AddCategory: React.FC<AddCategoryProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const params: Readonly<Partial<Category> | undefined> = route.params;
  const initialFields =
    params && params.fields ? params.fields : [initialCategoryField];
  const [fields, setFields] = useState<CategoryFieldType[]>(initialFields);
  const [legendExpanded, setLegendExpanded] = useState(true);
  const flatListRef = useRef<KeyboardAwareFlatList>(null);

  React.useEffect(() => {
    navigation.setOptions({
      title: params?.action === "edit" ? "Update Category" : "Add a Category",
    });
  }, []);

  function toggleLegend() {
    setLegendExpanded((prevState: boolean) => !prevState);
  }

  function handleFormSubmit(values: CategoryFormType) {
    if (fields.length === 0) {
      Alert.alert(
        "No attribute found",
        "Atleast a single attribute is required"
      );
      return;
    }

    const invalidFields = fields.filter((item) => item.name.length === 0);
    if (invalidFields.length > 0) {
      Alert.alert(
        "Invalid Field",
        "Some of the fields do not have a field name, kindly enter before proceeding"
      );
      return;
    }

    if (values.selectedTitle.value.length === 0) {
      Alert.alert(
        "Select a Title",
        "Kindly, select a field as title before proceeding"
      );
      return;
    }

    if (!params) {
      return;
    }

    if (params?.action === "add") {
      const fieldsWithUniqueIds = fields.map((item) => {
        return {
          ...item,
          id: nanoid(),
        };
      });
      const model: Category = {
        id: nanoid(),
        title: values.title.trim(),
        selectedTitle: {
          value: values.selectedTitle.value.trim(),
          id: values.selectedTitle.id,
        },
        fields: fieldsWithUniqueIds,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(insertCategory(model));
    } else {
      const model: Category = {
        id: params.id ?? "",
        title: values.title.trim(),
        selectedTitle: {
          value: values.selectedTitle.value.trim(),
          id: values.selectedTitle.id,
        },
        fields: fields,
        updatedAt: new Date().toISOString(),
      };
      dispatch(updateACategory(model));
    }
    navigation.pop();
  }

  function handleBackNav() {
    navigation.goBack();
  }

  function handleAddField() {
    setFields(() => {
      const temp = [...fields];
      temp.push({
        ...initialCategoryField,
        id: nanoid(),
      });
      return [...temp];
    });
    flatListRef.current?.scrollToEnd(true);
  }

  function handleFieldDelete(id: string) {
    setFields((prevState: CategoryFieldType[]) => {
      return prevState.filter((item) => item.id !== id);
    });
  }

  function handleFieldDetailsUpdate(data: CategoryFieldType) {
    setFields((prevState: CategoryFieldType[]) => {
      return prevState.map((item) => {
        return item.id === data.id ? data : item;
      });
    });
  }

  const initialValues: CategoryFormType = {
    title: params?.title ?? "",
    selectedTitle: {
      id: params?.selectedTitle?.id ?? "",
      value: params?.selectedTitle?.value ?? "",
    },
  };

  return (
    <SafeAreaView style={styles.safeAreView}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validateOnChange={false}
            validationSchema={CategoryFormValidation}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <>
                <View>
                  <TextInput
                    label={"Category Title"}
                    onChangeText={handleChange("title")}
                    value={values.title}
                    error={Boolean(errors.title)}
                  />
                  <HelperText type="error" visible={Boolean(errors.title)}>
                    {errors.title}
                  </HelperText>
                </View>
                {/* <List.Accordion
                  title="Legend"
                  description="Legend allows you to see the info for the attribute types."
                  titleStyle={{
                    fontWeight: "bold",
                    fontSize: 18,
                    textTransform: "uppercase",
                    color: "gray",
                  }}
                  descriptionStyle={{
                    fontSize: 12,
                    marginTop: 6,
                  }}
                  expanded={legendExpanded}
                  onPress={toggleLegend}
                >
                  <View
                    style={{ flexDirection: "row", backgroundColor: "white" }}
                  >
                    <List.Item
                      style={{ flex: 1 }}
                      title="Text"
                      description="Text Value"
                      left={(props) => (
                        <List.Icon {...props} icon="format-text" />
                      )}
                    />
                    <List.Item
                      style={{ flex: 1 }}
                      title="Numeric"
                      description="Number Value"
                      left={(props) => <List.Icon {...props} icon="numeric" />}
                    />
                  </View>
                  <View
                    style={{ flexDirection: "row", backgroundColor: "white" }}
                  >
                    <List.Item
                      style={{ flex: 1 }}
                      title="Checkbox"
                      description="Decision Value"
                      left={(props) => (
                        <List.Icon {...props} icon="checkbox-marked-outline" />
                      )}
                    />
                    <List.Item
                      style={{ flex: 1 }}
                      title="Date"
                      description="Date Value"
                      left={(props) => (
                        <List.Icon {...props} icon="calendar-range" />
                      )}
                    />
                  </View>
                </List.Accordion> */}

                <View style={styles.attributeInfoContainer}>
                  <View style={styles.attributeInfoTextContainer}>
                    <Text style={styles.attributeLabel}>Attributes</Text>
                    <Text style={styles.attributeDescription}>
                      Attributes of a category allow you to structure data.
                      Press the add icon to add more attributes.
                    </Text>
                  </View>
                  <Divider style={styles.divider} />
                  <IconButton
                    icon="plus-thick"
                    iconColor={"black"}
                    size={20}
                    mode={"contained-tonal"}
                    animated={true}
                    onPress={handleAddField}
                    style={styles.attributeAddButton}
                  />
                </View>

                <KeyboardAwareFlatList
                  ref={flatListRef}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.attributeListContentContainer}
                  style={styles.attributeListContainer}
                  showsVerticalScrollIndicator={false}
                  data={fields}
                  ItemSeparatorComponent={() => {
                    return <Divider style={styles.blankDivider} />;
                  }}
                  renderItem={({ item }) => (
                    <CategoryFieldList
                      item={item}
                      handleFieldDelete={handleFieldDelete}
                      handleFieldDetailsUpdate={handleFieldDetailsUpdate}
                      handleSetTitle={(selectedTitle) => {
                        setFieldValue("selectedTitle", {
                          id: selectedTitle.id,
                          value: selectedTitle.value,
                        });
                      }}
                      selectedTitle={values.selectedTitle}
                      fields={fields}
                    />
                  )}
                />
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    onPress={handleBackNav}
                    style={styles.actionCancelContainer}
                  >
                    <Text style={styles.actionCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <Divider style={styles.actionDivider} />
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={[
                      params?.action === "add"
                        ? styles.actionAddBG
                        : styles.actionUpdateBG,
                      styles.actionPrimaryContainer,
                    ]}
                  >
                    <Text
                      style={[
                        params?.action === "add"
                          ? styles.actionAddText
                          : styles.actionUpdateText,
                        styles.actionPrimaryText,
                      ]}
                    >
                      {params?.action === "add" ? "Add" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddCategory;
