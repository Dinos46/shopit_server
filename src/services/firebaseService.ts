import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

// const firebaseCreds = {
//   type: process.env.FB_TYPE,
//   project_id: process.env.FB_PROJECT_ID,
//   private_key: process.env.FB_TYPE_PRIVATE_KEY,
//   client_email: process.env.FB_TYPE_CKIENT_EMAIL,
//   client_id: process.env.FB_TYPE_CKIENT_ID,
//   auth_uri: process.env.FB_TYPE_AUTH_URI,
//   token_uri: process.env.FB_TYPE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FB_TYPE_AUTH_PROVIDER_X509_CERT_UR,
//   client_x509_cert_url: process.env.FB_TYPE_CLIENT_X509_CERT_URL,
// } as ServiceAccount;
var serviceAccount = require("../../config/firebaseConfig.json");

const app = initializeApp({
  credential: credential.cert(serviceAccount),
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
