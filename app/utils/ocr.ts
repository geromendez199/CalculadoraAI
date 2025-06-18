import Tesseract from "tesseract.js";

export async function recognizeTextFromImage(uri: string): Promise<string> {
  try {
    const result = await Tesseract.recognize(uri, "eng", {
      logger: (m) => console.log(m), // podés comentar esto si no querés logs
    });

    return result.data.text;
  } catch (error) {
    console.error("Error OCR:", error);
    return "";
  }
}
