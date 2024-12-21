import { Text, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomBtn = ({ title, onPress, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.active]}
    >
      <View style={styles.holder}>
        <Ionicons name={icon ? icon : "aperture-outline"} size={16} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    marginTop: 4,
    marginBottom: 4,
    justifyContent: "center",
    flexDirection: "row",
    padding: 8,
    borderWidth: 2,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginLeft: 4,
  },
  active: {
    opacity: 0.5,
  },
  holder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default CustomBtn;
