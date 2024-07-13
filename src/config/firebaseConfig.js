import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from ".";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
