import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NoPreview = () => {
  return (
    <View style={styles.noPreview}>
      <Text style={styles.text}>No Preview Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noPreview: {
    width: "100%",
    height: 200,
    backgroundColor: "pink",
    justifyContent: "center",
    opacity: 0.5,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
  },
});

export default NoPreview;
