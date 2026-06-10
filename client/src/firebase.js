import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDd9uPiQ2BghJS7j8nvjY1lp4Kfr2ezft8",
  authDomain: "edunova-5a449.firebaseapp.com",
  projectId: "edunova-5a449",
  storageBucket: "edunova-5a449.firebasestorage.app",
  messagingSenderId: "257276105900",
  appId: "1:257276105900:web:69d5f02e2fcfdd63a8fb09"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
