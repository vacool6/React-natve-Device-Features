import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import Constants from "expo-constants";

const LocationContext = createContext();

export const usePosition = () => useContext(LocationContext);

const LocationProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [coordinates, setCoordinates] = useState();
  const [uri, setUri] = useState("");
  const [uriMap, setUriMap] = useState("");

  const { apiKey, apiEndpoint } = Constants.expoConfig.extra;

  function submitHandler() {
    if (title && coordinates && uri && uriMap) {
      fetch(
        `https://api.${apiEndpoint}/geocode/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}&format=json&apiKey=${apiKey}`
      )
        .then((response) => response.json())
        .then((result) => {
          const data = {
            title,
            coordinates,
            address: result.results[0].formatted,
            uri,
            id: new Date().toString() + Math.random().toString(),
          };
          console.log(data);
        })
        .catch((error) => console.log("error", error));
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
