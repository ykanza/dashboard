import React from 'react';
import ReactGoogleLogin from 'react-google-login';
import axios from "axios";

export default function GoogleLogin({label, setRedirect}) {

    const handleOnSuccess = async (oauthRes) => {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/auth/google/login`,
        data: {tokenId: oauthRes.tokenId}
      })
      localStorage.setItem('accessToken', response.data.data.user.accessToken);
      setRedirect(true);
    }

    return (
      <ReactGoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText={label}
        onSuccess={handleOnSuccess}
        responseType="code,token"
      />
    );
}
