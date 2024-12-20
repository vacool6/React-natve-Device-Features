import { Image, StyleSheet, View } from "react-native";
import CustomBtn from "./CustomBtn";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import verifyPermission from "../utils/VerifyHandler";
import NoPreview from "./NoPreview";
import { useNavigation } from "@react-navigation/native";
import { usePosition } from "../context/locationContext";
import { useEffect } from "react";
import Constants from "expo-constants";

const LocationPicker = () => {
  const [locationPermission, requestPermission] = useForegroundPermissions();
  const { coordinates, uriMap, setUriMap, setCoordinates } = usePosition();
  const { apiKey, apiEndpoint, mapStyle } = Constants.expoConfig.extra;

  const navigator = useNavigation();

  async function locateMe() {
    const hasPermission = await verifyPermission(
      locationPermission,
      PermissionStatus,
      requestPermission
    );

    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();

    setCoordinates({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  async function pickOnMap() {
    setCoordinates();
    navigator.navigate("Map");
  }

  const getStaticMapImageUrl = (latitude, longitude, zoom = 14) => {
    const url = `https://maps.${apiEndpoint}/staticmap?style=${mapStyle}&center=lonlat:${longitude},${latitude}&zoom=${zoom}&apiKey=${apiKey}`;
    setUriMap(url);
  };

  useEffect(() => {
    if (coordinates) {
      getStaticMapImageUrl(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates]);

  return (
    <View>
      {uriMap ? (
        <Image source={{ uri: uriMap }} style={styles.img} />
      ) : (
        <NoPreview />
      )}
      <View style={styles.btnContainer}>
        <CustomBtn title="Locate Me" icon={"location"} onPress={locateMe} />
        <CustomBtn title="Pick on Map" icon={"map"} onPress={pickOnMap} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: {
    width: "100%",
    height: 200,
  },
});

export default LocationPicker;
