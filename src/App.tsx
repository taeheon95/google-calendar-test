import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import CaledarRedirect from './pages/CalendarRedirect';
import Root from './pages/RootPage';

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;
const scope = 'https://www.googleapis.com/auth/calendar';
const access_type = 'offline';
const include_granted_scopes = true;
const redirectUrl = 'https://localhost:5173/redirect';
const oauthUrl =
  'https://accounts.google.com/o/oauth2/v2/auth' +
  `?scope=${scope}` +
  `&access_type=${access_type}` +
  `&include_granted_scopes=${include_granted_scopes}` +
  '&state=state_parameter_passthrough_value' +
  `&redirect_uri=${redirectUrl}` +
  '&response_type=code' +
  `&client_id=${VITE_GOOGLE_CLIENT_ID}`;

function App() {
  return (
    <>
      <nav>
        <Link to="/">루트</Link>
        <Link to="/calendar">캘린더</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Root oauthUrl={oauthUrl} />} />
        <Route path="/calendar" />
        <Route
          path="/redirect"
          element={
            <CaledarRedirect
              clientId={VITE_GOOGLE_CLIENT_ID}
              clientSecret={VITE_GOOGLE_CLIENT_SECRET}
              include_granted_scopes={include_granted_scopes}
              redirectUrl={redirectUrl}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
