import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";

import { createDocument } from "./firestore.utils";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKGx6R_NNmK7kbRCG32r3NEabPH8OSr98",
  authDomain: "prod-auth-190a8.firebaseapp.com",
  projectId: "prod-auth-190a8",
  storageBucket: "prod-auth-190a8.appspot.com",
  messagingSenderId: "479554004549",
  appId: "1:479554004549:web:e6adf1187ee03f2b18252c",
};

/**
 * initiate firbase app
 */
export const app = initializeApp(firebaseConfig);

/**for google signin provider */
export const gProvider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();
export const auth = getAuth();

/**
 * initiate firestore
 */

export const db = getFirestore(app);
/**
 * Signup new users
 */
export const createUserWithEmailPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

/**
 *Sign in existing users
 *
 */
export const signInWithEmailPassword = (email, password) => {
  console.log(email, password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

/**
 * Set an authentication state observer and get user data
 */
export const onAuthStateChange = (user) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

/**
 * PopUp Method
 * Authenticate with firebase using Google provider object for a web screen
 */

export const signInWithGoogleProviderPopUp = (auth, provider) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("signup cred", result);
      const token = credential.accessToken;
      console.log("credential", credential);

      // The signed-in user info.
      const user = result.user;
      console.log("user ", user);
      console.log("result ", result);
      /**
       * Check for the user already exist or not
       */
      const { email, emailVerified, providerId, uid } = user;
      createDocument(db, "users", {
        email,
        emailVerified,
        providerId,
        uid,
        createdAt: new Date(),
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

/**
 * Redirect Method
 * Authenticate with firebase using google provider object for a mobile screen
 */
export const signInWithGoogleProviderRedirect = () =>
  signInWithRedirect(auth, gProvider);

/**
 * Signin with FB popup
 */

export const signInWithFacebookProviderPopup = (auth, fbProvider) =>
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      const { email, emailVerified, providerId, uid } = user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      createDocument(db, "users", {
        email,
        emailVerified,
        providerId,
        uid,
        loginType: credential.providerId,
        createdAt: new Date(),
      });
      console.log("result: ", result);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log("errorCode", errorCode);
      console.log("errorMsg", errorMessage);
      console.log(email, credential);
      // ...
    });
