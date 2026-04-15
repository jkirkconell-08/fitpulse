/* =========================================================
   FitPulse - Firebase Configuration
   
   INSTRUCCIONES:
   1. Ve a https://console.firebase.google.com
   2. Crea un proyecto nuevo llamado "FitPulse"
   3. En Authentication → Sign-in method, habilita "Google"
   4. En Firestore Database, crea una base de datos (modo de prueba)
   5. En Project Settings → General, busca "Your apps" → Web app
   6. Copia los valores de firebaseConfig y reemplaza los de abajo
   ========================================================= */

const FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "000000000000",
  appId: "TU_APP_ID_AQUI"
};

// Firebase will be initialized in auth.js after SDK loads
