import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyTheme } from "./utils/theme";

import AllPlaces from "./components/screens/AllPlaces";
import AddFavPlace from "./components/screens/AddFavPlace";
import NavigatorBtn from "./components/NavigatorBtn";
import Map from "./components/screens/Map";
import LocationProvider from "./context/locationContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar />
        <Stack.Navigator>
          <Stack.Screen
            name="YourPlaces"
            component={AllPlaces}
            options={{
              title: "Your Places",
              headerRight: () => {
                return (
                  <NavigatorBtn title="Add" to="AddAPlace" icon="add-outline" />
                );
              },
            }}
          />
          <Stack.Screen
            name="AddAPlace"
            component={AddFavPlace}
            options={{
              title: "Add Place ⌂",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerRight: () => {
                return (
                  <NavigatorBtn title="Save " to="AddAPlace" icon="save" />
                );
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
