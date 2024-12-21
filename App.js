import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MyTheme } from "./utils/theme";

import AllPlaces from "./components/screens/AllPlaces";
import AddFavPlace from "./components/screens/AddFavPlace";
import NavigatorBtn from "./components/NavigatorBtn";
import Map from "./components/screens/Map";
import LocationProvider from "./context/locationContext";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { init } from "./utils/database";
import PlaceDetails from "./components/screens/PlaceDetails";

const Stack = createStackNavigator();

export default function App() {
  const [dbInitialized, setDBInitialize] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await init();
        setDBInitialize(true);
      } catch (err) {
        console.log("Error >", err);
      }
    };

    initializeDatabase();
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <LocationProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "pink",
            headerStyle: {
              backgroundColor: "grey",
            },
          }}
        >
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
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}
