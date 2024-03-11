import * as FileSystem from "expo-file-system";

// Function to handle file upload
export const handleFileUpload = async (recordingUri: string) => {
  try {
    // Read the audio file as a Base64 string
    const base64Audio = await FileSystem.readAsStringAsync(recordingUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert the Base64 string into a Blob
    const blob = b64toBlob(base64Audio, "audio/mpeg");

    const response = await fetch("http://192.168.1.29:3000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: JSON.stringify(blob),
      }),
    });
    const data = await response.json();

    console.log("File uploaded successfully. Link:", data);
  } catch (error) {
    console.error("Error handling file upload:", error);
  }
};

// Function to convert Base64 string to Blob
function b64toBlob(base64: string, contentType: string) {
  return new Blob([base64], { type: contentType });
}
