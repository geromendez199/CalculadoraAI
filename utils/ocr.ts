import { recognize } from "react-native-tesseract-ocr";

const tessOptions = {
  whitelist: null, // caracteres permitidos, ej. '0123456789+-*/='
  blacklist: null, // caracteres prohibidos
};

export async function recognizeTextFromImage(uri: string): Promise<string> {
  try {
    console.log("🧠 Procesando imagen con OCR:", uri);
    const text = await recognize(uri, "ENG", tessOptions);
    console.log("🧠 Texto reconocido:", text);
    return text;
  } catch (error) {
    console.error("🛑 Error OCR:", error);
    return "";
  }
}
