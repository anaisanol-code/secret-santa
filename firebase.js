const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
