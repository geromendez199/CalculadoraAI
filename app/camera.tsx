import {
  CameraView,
  useCameraPermissions,
  type CameraCapturedPicture,
} from "expo-camera";
import React, { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { recognizeTextFromImage } from "../utils/ocr"; // ✅ correcta para tu estructura

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Necesitamos permiso para usar la cámara</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync();
      console.log("📸 URI de la foto:", photo.uri);

      const text = await recognizeTextFromImage(photo.uri);
      console.log("🧠 Texto reconocido:", text);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <Button title="📸 Tomar foto" onPress={takePicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});
