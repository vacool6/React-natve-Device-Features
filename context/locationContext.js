import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const usePosition = () => useContext(LocationContext);

const LocationProvider = ({ children }) => {
  const [coordinates, setCoordinates] = useState();
  const [uri, setUri] = useState("");
  const [uriMap, setUriMap] = useState("");

  const value = { coordinates, uri, uriMap, setCoordinates, setUri, setUriMap };
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
