import React, { useState } from "react";
import {
  auth,
  gProvider,
  fbProvider,
  signInWithGoogleProviderPopUp,
  signInWithFacebookProviderPopup,
} from "../../firebase/firebase.utils";
import { Input, Button } from "reactstrap";

const UserLogin = (props) => {
  const [userCredential, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setUserCredentials((_) => ({
      ..._,
      [event.target.name]: event.target.valuse,
    }));
  };
  const handleSubmit = (loginType) => {
    switch (loginType) {
      case "googleIdp":
        const response = signInWithGoogleProviderPopUp(auth, gProvider);
        if (response) {
        }
        break;
      default:
        console.log("login Type not found");
    }

    console.log(userCredential);
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Signin with your email and password</span>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={userCredential.email}
          name="email"
          id="email"
          label="email"
          onChange={handleInputChange}
          required
        />

        <Input
          type="password"
          value={userCredential.password}
          name="password"
          id="password"
          label="password"
          onChange={handleInputChange}
          required
        />
        <div className="buttons">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={() => handleSubmit("googleIdp")}>
            Signin with Google
          </Button>
          <Button
            type="button"
            onClick={() => signInWithFacebookProviderPopup(auth, fbProvider)}
          >
            Signin with FB
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UserLogin;
