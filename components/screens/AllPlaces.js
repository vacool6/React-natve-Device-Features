import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { getAllPlaces } from "../../utils/database";
import { useEffect, useState } from "react";

const AllPlaces = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllPlaces = async () => {
      const result = await getAllPlaces();
      setData(result);
    };
    fetchAllPlaces();
  }, []);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={(thing) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("PlaceDetails", {
                    id: thing.item.id,
                  })
                }
              >
                <View style={styles.banner}>
                  <Text style={styles.text}>
                    {thing.item.title.length > 10
                      ? thing.item.title.slice(0, 10) + "..."
                      : thing.item.title}
                  </Text>
                  <Image source={{ uri: thing.item.uri }} style={styles.img} />
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(stuff) => stuff.id}
        />
      ) : (
        <Text>Seems like you have not added any place yet!</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: 200,
  },
  banner: {
    position: "relative",
    marginBottom: 24,
    borderWidth: 1,
  },
  text: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "orange",
    fontSize: 24,
    width: "50%",
    top: "10",
    right: "0",
    paddingLeft: 6,
  },
});
export default AllPlaces;
