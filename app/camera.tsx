import { CameraView, useCameraPermissions } from "expo-camera";
import { evaluate } from "mathjs";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { recognizeTextFromImage } from "../utils/ocr";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!cameraRef.current) return;

    setLoading(true);
    setText("");

    try {
      const photo = await cameraRef.current.takePictureAsync({
        skipProcessing: true,
      });
      console.log("📸 URI de la foto:", photo.uri);

      const result = await recognizeTextFromImage(photo.uri);
      console.log("🧠 Texto reconocido:", result);

      let respuesta = "";
      try {
        respuesta = evaluate(result).toString();
      } catch (e) {
        respuesta = "(no se pudo resolver)";
      }

      setText(`${result} = ${respuesta}`);
    } catch (err: any) {
      console.error("📛 Error al procesar imagen:", err);
      Alert.alert("Error", "No se pudo procesar la imagen.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <Button title="📸 Tomar foto" onPress={takePicture} />
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : text ? (
        <Text style={styles.result}>🧠 {text}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 3,
    width: "100%",
  },
  loader: {
    marginTop: 20,
  },
  result: {
    padding: 20,
    fontSize: 18,
    color: "#333",
  },
});
