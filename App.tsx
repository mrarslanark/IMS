import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import Routes from "./src/constants/routes";
import { RootDrawerParamList, RootStackParamList } from "./src/navigator";
import AddCategory from "./src/screens/AddCategory";
import CategoryList from "./src/screens/CategoryList";
import Dashboard from "./src/screens/Dashboard";
import DyanmicCategory from "./src/screens/DynamicCategory";
import DynamicItemAdd from "./src/screens/DynamicItemAdd";
import { RootState, store } from "./src/store";
import { Category } from "./src/store/slices/categories";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

const Drawer = createDrawerNavigator<RootDrawerParamList | any>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </ReduxProvider>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.DrawerNavigator}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={Routes.DrawerNavigator}
        component={DrawerNavigator}
      />
      <Stack.Screen name={Routes.AddCategory} component={AddCategory} />
      <Stack.Screen
        name={Routes.DynamicItemAdd}
        options={{ title: "Add an Item" }}
        component={DynamicItemAdd}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const categories: Category[] = useSelector(
    (state: RootState) => state.root.categories.categories
  );

  return (
    <Drawer.Navigator initialRouteName={Routes.Dashboard}>
      <Drawer.Screen name={Routes.Dashboard} component={Dashboard} />
      <Drawer.Screen
        name={Routes.CategoryList}
        options={{ title: "Categories" }}
        component={CategoryList}
      />
      {categories.length > 0 &&
        categories.map((category) => {
          return (
            <Drawer.Screen
              key={category.id}
              name={category.title}
              component={DyanmicCategory}
              initialParams={{ categoryId: category.id }}
            />
          );
        })}
    </Drawer.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
