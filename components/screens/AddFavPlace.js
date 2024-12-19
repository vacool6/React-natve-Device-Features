import { ScrollView, Text, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import ImagePicker from "../ImagePicker";
import LocationPicker from "../LocationPicker";

const AddFavPlace = () => {
  return (
    <ScrollView style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} />
      <View style={styles.imgContainer}>
        <ImagePicker />
      </View>
      <View style={styles.locationContainer}>
        <LocationPicker />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
  },
  imgContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  locationContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
});

export default AddFavPlace;
