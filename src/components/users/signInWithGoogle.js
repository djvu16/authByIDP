import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
const LoginComponent = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };
  const componentClicked = () => {
    console.log("fb login clicked");
  };
  return (
    <div>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_LOGIN_WITH_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div>
        <FacebookLogin
          appId={process.env.REACT_APP_LOGIN_WITH_FB_APP_ID}
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
        />
      </div>
    </div>
  );
};

export default LoginComponent;
