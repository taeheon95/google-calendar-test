import QueryString from "qs";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from "../../types/auth";
import RedirectContainer from "./RedirectContainer";

interface Prop {
  clientId: string;
  clientSecret: string;
  scope: string;
  access_type: string;
  include_granted_scopes: boolean;
  redirectUrl: string;
  oauthUrl: string;
}

function RedirectIndex(props: Prop) {
  const query = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { code } = query;
  const { clientId, redirectUrl, clientSecret, scope } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    if (
      code !== undefined &&
      typeof code === "string" &&
      !accessToken &&
      !refreshToken
    ) {
      getTokens();
    }
  }, []);

  const getTokens = useCallback(async () => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v4/token",
      // "https://oauth2.googleapis.com/token"
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          // redirect_uri: "https://local.wehago.com:3000/redirect",
          redirect_uri: "https://localhost:3001/redirect",
          client_secret: clientSecret,
          grant_type: "authorization_code",
          code,
        }),
      }
    );

    if (response.ok) {
      const result = (await response.json()) as GoogleAuth;
      result.refresh_token &&
        localStorage.setItem("refresh_token", result.refresh_token);
      localStorage.setItem("access_token", result.access_token);
      navigate("/");
    }
  }, []);

  return <RedirectContainer />;
}

export default RedirectIndex;
