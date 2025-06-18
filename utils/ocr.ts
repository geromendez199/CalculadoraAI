import axios from "axios";
import * as FileSystem from "expo-file-system";

export async function recognizeTextFromImage(uri: string): Promise<string> {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      {
        base64Image: `data:image/jpg;base64,${base64}`,
        language: "eng",
        isOverlayRequired: false,
      },
      {
        headers: {
          apikey: "helloworld", // clave gratuita de prueba
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const parsedText = response.data?.ParsedResults?.[0]?.ParsedText || "";
    return parsedText;
  } catch (error) {
    console.error("Error OCR:", error);
    return "";
  }
}
