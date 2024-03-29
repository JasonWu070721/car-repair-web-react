import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router";

import { auth, googleProvider, facebookProvider } from "../config/GoogleAth";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

const checkAuth = () => {};

const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    console.log(auth?.currentUser?.email);
  } catch (err) {
    console.error(err);
  }
};

const GoogleLogin = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (credential === null) {
            return;
          }
          const token = credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...

          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          console.log(email);
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(credential);
          // ...
        });
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, facebookProvider)
        .then((result) => {
          // This gives you a Facebook Access Token. You can use it to access the Google API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          if (credential === null) {
            return;
          }
          const token = credential.accessToken;
          console.log(token);
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...

          navigate("/dashboard");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          console.log(email);
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
          console.log(credential);
          // ...
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        onClick={signInWithGoogle}
        startIcon={<GoogleIcon />}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Google Sign In
      </Button>

      <Button
        onClick={signInWithFacebook}
        startIcon={<FacebookIcon />}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Facebook Sign In
      </Button>
    </div>
  );
};

export { GoogleLogin, signIn, checkAuth, logOut };
