import { Text, Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavigatorBtn = ({ title, to, icon, params }) => {
  const navigator = useNavigation();

  function pressHandler() {
    if (params) {
      console.log(params);
      navigator.navigate(to, params);
    } else {
      navigator.navigate(to);
    }
  }

  return (
    <Pressable onPress={pressHandler}>
      <View style={styles.btnContainer}>
        <Text style={styles.text}>{title}</Text>
        <Ionicons name={icon} size={16} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
  text: {
    fontSize: 20,
  },
});

export default NavigatorBtn;
