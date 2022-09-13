import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import CaledarRedirect from "./pages/CalendarRedirect";
import Root from "./pages/RootPage";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;

function App() {
  // https://console.cloud.google.com/apis/credentials/oauthclient/313412959201-22nn8dtf78p68ibi9l8udg0mk9h0pbi8.apps.googleusercontent.com?authuser=1&project=wehago-206301
  const clientId = useMemo(() => VITE_GOOGLE_CLIENT_ID, []);
  const cliendSecret = useMemo(() => VITE_GOOGLE_CLIENT_SECRET, []);
  const scope = useMemo(() => "https://www.googleapis.com/auth/calendar", []);
  const access_type = useMemo(() => "offline", []);
  const include_granted_scopes = useMemo(() => true, []);
  const redirectUrl = useMemo(() => `${location.href}redirect`, []);
  console.log(redirectUrl);
  const oauthUrl = useMemo(
    () =>
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?scope=${scope}` +
      `&access_type=${access_type}` +
      `&include_granted_scopes=${include_granted_scopes}` +
      "&state=state_parameter_passthrough_value" +
      `&redirect_uri=${redirectUrl}` +
      "&response_type=code" +
      `&client_id=${clientId}`,
    []
  );

  return (
    <>
      <nav>
        <Link to="/">루트</Link>
        <Link to="/calendar">캘린더</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Root
              clientId={clientId}
              clientSecret={cliendSecret}
              scope={scope}
              access_type={access_type}
              include_granted_scopes={include_granted_scopes}
              redirectUrl={redirectUrl}
              oauthUrl={oauthUrl}
            />
          }
        />
        <Route path="/calendar" />
        <Route
          path="/redirect"
          element={
            <CaledarRedirect
              clientId={clientId}
              clientSecret={cliendSecret}
              scope={scope}
              access_type={access_type}
              include_granted_scopes={include_granted_scopes}
              redirectUrl={redirectUrl}
              oauthUrl={oauthUrl}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
