import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getPlaceById } from "../../utils/database";
import MapView, { Marker } from "react-native-maps";

const TextWrapper = ({ title, data }) => {
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.innerText}>{title}</Text>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
};

const PlaceDetails = ({ route }) => {
  const [data, setData] = useState();
  const { id } = route.params;

  const region = {};

  useEffect(() => {
    if (id) {
      const fetchPlace = async () => {
        const result = await getPlaceById(id);
        setData(result);
      };
      fetchPlace();
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      {data ? (
        <View>
          <Image source={{ uri: data.uri }} style={styles.img} />
          <TextWrapper title={"Title:"} data={data.title} />
          <TextWrapper title={"Address:"} data={data.address} />
          <TextWrapper title={"Latitude:"} data={data.lat} />
          <TextWrapper title={"Longitude:"} data={data.lng} />
          <MapView
            initialRegion={{
              latitude: data.lat,
              longitude: data.lng,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            style={styles.map}
          >
            <Marker
              title="Pick a location"
              coordinate={{
                latitude: data.lat,
                longitude: data.lng,
              }}
            />
          </MapView>
        </View>
      ) : (
        <Text>Place might have been deleted</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: 200,
    borderWidth: 1,
  },
  text: {
    padding: 4,
    paddingLeft: 0,
  },

  map: {
    width: "100%",
    height: 400,
  },
  innerText: {
    fontSize: 18,
    fontFamily: "monospace",
  },
  textWrapper: {
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 1,
    paddingLeft: 4,
    borderColor: "grey",
  },
});
export default PlaceDetails;
