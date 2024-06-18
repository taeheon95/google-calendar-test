import { useCallback } from 'react';
import { GoogleAuth } from '../types/auth';

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const client_secret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

const getGoogleTokens = async (code: string, redirect_uri: string) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id,
      redirect_uri,
      grant_type: 'authorization_code',
      client_secret,
      code,
    }),
  });
  if (response.ok) {
    return (await response.json()) as GoogleAuth;
  } else {
    console.error(response);
    throw new Error(response.statusText);
  }
};

const getRefreshAccessTokens = async (refresh_token: string) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    }),
  });
  if (response.ok) {
    return (await response.json()) as GoogleAuth;
  } else {
    console.error(response);
    console.error(await response.json());
    throw new Error(response.statusText);
  }
};

export { getGoogleTokens, getRefreshAccessTokens };
