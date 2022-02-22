import { getAuth } from 'firebase-admin/auth';
// import { initializeApp } from 'firebase-admin/app';
// import { credential } from 'firebase-admin';

// const serviceAccount = config.get("firebase");
// const app = initializeApp({
//   credential: credential.cert(serviceAccount),
// });

export const auth = getAuth();
