import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Routes from "./src/constants/routes";
import { CategoriesStackParamList, RootDrawerParamList } from "./src/navigator";
import AddCategory from "./src/screens/AddCategory";
import CategoryList from "./src/screens/CategoryList";
import Dashboard from "./src/screens/Dashboard";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./src/store";

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<CategoriesStackParamList>();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={Routes.Dashboard}>
            <Drawer.Screen name={Routes.Dashboard} component={Dashboard} />
            <Drawer.Screen
              name={Routes.Categories}
              component={CategoryStackNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </ReduxProvider>
  );
};

const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.CategoryList}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={Routes.CategoryList} component={CategoryList} />
      <Stack.Screen name={Routes.AddCategory} component={AddCategory} />
    </Stack.Navigator>
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
