import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";

const firebaseCreds = require("../../config/firebaseConfig.json");
const app = initializeApp({
  credential: credential.cert(firebaseCreds),
});

export const auth = getAuth(app);
