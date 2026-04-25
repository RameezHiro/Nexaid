import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TROUBLESHOOTING: Using direct config object to bypass .env issues
const firebaseConfig = {
  apiKey: "AIzaSyBYQhVZ9DDVhCndainw2J1mvw6sX8o27Tg",
  authDomain: "volunteerbridge-bb2b4.firebaseapp.com",
  projectId: "volunteerbridge-bb2b4",
  storageBucket: "volunteerbridge-bb2b4.firebasestorage.app",
  messagingSenderId: "186856953359",
  appId: "1:186856953359:web:b731b676ce454d9fcfb57a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
