import React, { useState, useCallback } from "react";
import * as FileSystem from "expo-file-system";

export const useUpload = () => {
  const [url, setUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");

  const handleUpload = useCallback(async (uri: string, callback: any) => {
    if (!uri) {
      setError("Please select a file!");
      return;
    }

    setUploadStatus("Uploading...");
    setError("");

    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileName = uri.split("/").pop();
      const response = await fetch("http://192.168.1.29:3000/upload", {
        method: "POST",
        body: JSON.stringify({ fileData: base64, fileName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const json = await response.json();
      console.log("json", json);
      setUrl(json.path);
      callback(json.path);
      setUploadStatus("Upload successful!");
      // Handle successful upload here (e.g., clear form, display success message)
    } catch (error: any) {
      console.error("Error uploading file:", error);
      setError(error.message || "An error occurred while uploading the file!");
    } finally {
      setUploadStatus("");
    }
  }, []);

  return { uploadStatus, url, error, handleUpload };
};
