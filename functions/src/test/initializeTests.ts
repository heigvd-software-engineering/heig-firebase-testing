import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import {User} from "./user";

export async function initializeTests(user: User): Promise<firebaseApp.FirebaseApp> {
  let app;
  let auth;

  if (firebaseApp.getApps().length === 0) {
    app = firebaseApp.initializeApp({
      apiKey: "AIzaSyCU7Q2zK8s21FDpL9aanINx7RmKHTiXpnA",
      authDomain: "heig-firebase-testing.firebaseapp.com",
      projectId: "heig-firebase-testing",
      storageBucket: "heig-firebase-testing.appspot.com",
      messagingSenderId: "417300301383",
      appId: "1:417300301383:web:c4adf99692a403acfa1362",
      measurementId: "G-0P5VTXM07L"
    }, "demo-heig-firebase-testing");
      auth = firebaseAuth.initializeAuth(app);
    firebaseAuth.connectAuthEmulator(auth, "http://localhost:9099");
  } else {
    app = firebaseApp.getApp("demo-heig-firebase-testing");
    auth = firebaseAuth.getAuth(app);
  }

  let userCredential;
  try {
    userCredential = await firebaseAuth.createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
    );
  } catch (e) {
    const authCredential = firebaseAuth.EmailAuthProvider.credential(
        user.email,
        user.password,
    );
    userCredential = await firebaseAuth.signInWithCredential(
        auth,
        authCredential,
    );
  }

  const token = await userCredential.user.getIdToken();
  user.uid = userCredential.user.uid;
  user.token = token;

  return app;
}
