import { storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImageHandle = async (file, fileName, folderName = "questions") => {
  try {
    const storageRef = ref(storage, `${folderName}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return {
      status: "success",
      url: downloadURL,
    };
  } catch (error) {
    console.log("Upload failed:", error);
    return {
      status: "error",
      error: error.message,
      url: "",
    };
  }
};

export { uploadImageHandle };
