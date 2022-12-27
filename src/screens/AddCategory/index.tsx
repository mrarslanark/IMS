import { Formik } from "formik";
import React, { useState, useRef } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Divider, TextInput, HelperText } from "react-native-paper";
import styles from "./styles";

import "react-native-get-random-values";
import { nanoid } from "nanoid";

import { CategoryFormValidation } from "../../constants/validations";
import { AddCategoryProps } from "../../navigator";
import CategoryFieldList, { CategoryFieldType } from "./CategoryFieldList";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { Category, insertCategory } from "../../store/slices/categories";
import { AppDispatch } from "../../store";

type CategoryFormType = {
  title: string;
};

const initialValues: CategoryFormType = {
  title: "",
};

const initialCategoryField: CategoryFieldType = {
  id: nanoid(),
  name: "",
  type: "text",
  label: "Text",
  icon: "format-text",
};

const AddCategory: React.FC<AddCategoryProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [fields, setFields] = useState<CategoryFieldType[]>([
    initialCategoryField,
  ]);
  const flatListRef = useRef<KeyboardAwareFlatList>(null);

  function handleFormSubmit(values: CategoryFormType) {
    const invalidFields = fields.filter((item) => item.name.length === 0);
    if (invalidFields.length > 0) {
      Alert.alert(
        "Invalid Field",
        "Some of the fields do not have a field name, kindly enter before proceeding"
      );
      return;
    }

    const model: Category = {
      id: nanoid(),
      title: values.title.trim(),
      fields,
    };
    dispatch(insertCategory(model));
    navigation.pop();
  }

  function handleBackNav() {
    navigation.goBack();
  }

  function handleAddField() {
    setFields((prevState: CategoryFieldType[]) => {
      prevState.push({
        ...initialCategoryField,
        id: nanoid(),
      });
      return [...prevState];
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validateOnChange={false}
          validationSchema={CategoryFormValidation}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
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
              <Button mode="outlined" onPress={handleAddField}>
                {fields.length > 0 ? "Add Another Field" : "Add a Field"}
              </Button>
              <KeyboardAwareFlatList
                ref={flatListRef}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
                showsVerticalScrollIndicator={false}
                data={fields}
                ItemSeparatorComponent={() => {
                  return (
                    <Divider
                      style={{
                        marginVertical: 6,
                        backgroundColor: "transparent",
                      }}
                    />
                  );
                }}
                renderItem={({ item }) => (
                  <CategoryFieldList
                    item={item}
                    handleFieldDelete={handleFieldDelete}
                    handleFieldDetailsUpdate={handleFieldDetailsUpdate}
                  />
                )}
                style={{ marginVertical: 12, paddingVertical: 12 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  alignItems: "center",
                  marginVertical: 24,
                }}
              >
                <Button
                  buttonColor="lightgray"
                  textColor="white"
                  mode="contained-tonal"
                  onPress={handleBackNav}
                >
                  Cancel
                </Button>
                <Button mode="contained-tonal" onPress={handleSubmit}>
                  Add Category
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddCategory;
