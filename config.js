import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
  import { getFirestore , doc, getDoc ,collection, addDoc , setDoc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
   apiKey: "AIzaSyDcrwhWiJY5yUEbYpqD3s1qsW8a-lO21MQ",
    authDomain: "chat-application-4bb94.firebaseapp.com",
    projectId: "chat-application-4bb94",
    storageBucket: "chat-application-4bb94.firebasestorage.app",
    messagingSenderId: "92312319970",
    appId: "1:92312319970:web:4cbc4c27095faf7cdfabbb",
    measurementId: "G-VFWM02V457"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const auth = getAuth(app);
  const db = getFirestore(app);

  export {
    auth,
    createUserWithEmailAndPassword,
    db,
    setDoc,
    doc,
    getDoc,
    collection, 
    addDoc,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getDocs, query, where,
  }
