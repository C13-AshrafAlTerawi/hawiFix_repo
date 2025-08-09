import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log("Google response:", response);
    if (response.tokenId) {
      axios
        .post("/auth/google/callback", { token: response.tokenId })
        .then((res) => {
          console.log("Login successful:", res.data);
          localStorage.setItem("token", res.data.token);
          window.location.href = "/";
        })
        .catch((err) => {
          console.error("Error logging in via Google:", err);
        });
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId="212444646882-safobm9cmv8bvgurn59pr8antuspd668.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleLoginButton;
