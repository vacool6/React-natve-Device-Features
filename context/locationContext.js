import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";
import { insertPlace } from "../utils/database";

const LocationContext = createContext();

export const usePosition = () => useContext(LocationContext);

const LocationProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState();
  const [uri, setUri] = useState("");
  const [uriMap, setUriMap] = useState("");

  const { apiKey, apiEndpoint } = Constants.expoConfig.extra;

  async function submitHandler() {
    if (title && coordinates && uri && uriMap) {
      try {
        const response = await fetch(
          `https://api.${apiEndpoint}/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json&apiKey=${apiKey}`
        );
        const result = await response.json();
        const data = {
          title,
          coordinates,
          address: result.results[0].formatted,
          uri,
          id: new Date().toString() + Math.random().toString(),
        };
        const set = await insertPlace(data);
        if (set) {
          setCoordinates();
          setTitle("");
          setUri("");
          setUriMap("");
          Alert.alert("Congrats!", "Your place has been saved");
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      Alert.alert("Alert!", "Please fill the form.");
    }
  }

  const value = {
    coordinates,
    uri,
    uriMap,
    title,
    setCoordinates,
    setUri,
    setUriMap,
    setTitle,
    submitHandler,
  };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
