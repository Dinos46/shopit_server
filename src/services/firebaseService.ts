import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";

const firebaseCreds = require("../../config/firebaseConfig.json");
const app = initializeApp({
  credential: credential.cert(firebaseCreds),
});

export const auth = getAuth(app);

export const validateRequest = async (headers: any) => {
  if (!headers["authorization"]) {
    return null;
  }
  const token = headers["authorization"].split(" ")[1];
  const idToken = await auth.verifyIdToken(token);
  if (idToken) {
    const { email } = idToken;
    return email;
  }
  return null;
};
