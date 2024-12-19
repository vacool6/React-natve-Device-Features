import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { usePosition } from "../../context/locationContext";

const Map = () => {
  const { coordinates, setCoordinates } = usePosition();

  const region = {
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 15,
    longitudeDelta: 15,
  };

  function markerHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setCoordinates({ latitude: lat, longitude: long });
  }

  return (
    <MapView initialRegion={region} style={styles.map} onPress={markerHandler}>
      {coordinates && (
        <Marker
          title="Pick a location"
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
