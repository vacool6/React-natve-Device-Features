import { Image, StyleSheet, View } from "react-native";
import CustomBtn from "./CustomBtn";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import verifyPermission from "../utils/VerifyHandler";
import NoPreview from "./NoPreview";
import { usePosition } from "../context/locationContext";

const ImagePicker = () => {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const { uri, setUri } = usePosition();

  async function ImgPicker() {
    const hasPermission = await verifyPermission(
      cameraPermission,
      PermissionStatus,
      requestPermission
    );

    if (!hasPermission) return;

    const image = await launchCameraAsync({
      // allowsEditing: true,
      aspect: [16, 9],
      quality: 0.25,
    });
    setUri(image.assets[0].uri);
  }

  return (
    <View>
      {uri ? <Image source={{ uri: uri }} style={styles.img} /> : <NoPreview />}
      <CustomBtn
        title={uri ? "Try Again" : "Take A Pic"}
        onPress={ImgPicker}
        icon={"camera"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
  },
  noPreview: {
    width: "100%",
    height: 200,
    backgroundColor: "pink",
    justifyContent: "center",
    opacity: 0.5,
  },
  text: {
    textAlign: "center",
  },
});

export default ImagePicker;
