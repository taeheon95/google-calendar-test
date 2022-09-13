import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { GoogleCalendarList } from "../../types/calendar";
import RootContainer from "./RootContainer";
import { getGoogleCalendarList as googleCalendarListGetApi } from "../../apis/calendar";
import { getRefreshedAccessTokens } from "../../apis/auth";
import { GoogleCalendarEventList } from "../../types/event";

const googleCalendarUri = "https://www.googleapis.com/calendar/v3";

interface Prop {
  clientId: string;
  clientSecret: string;
  scope: string;
  access_type: string;
  include_granted_scopes: boolean;
  redirectUrl: string;
  oauthUrl: string;
}

function RootIndex(props: Prop) {
  const { oauthUrl } = props;

  const [googleCalendarList, setGoogleCalendarList] =
    useState<GoogleCalendarList>();

  const [events, setEvents] = useState<GoogleCalendarEventList>();

  const getGoogleCalendarList = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      if (accessToken !== null && accessToken !== undefined) {
        const calendarList = await googleCalendarListGetApi(accessToken);
        setGoogleCalendarList(calendarList);
      } else {
        throw new Error("access 토큰이 없습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      if (refreshToken !== null && refreshToken !== undefined) {
        const response = await getRefreshedAccessTokens(refreshToken);
        localStorage.setItem("access_token", response.access_token);
      } else {
        throw new Error("refresh 토큰이 없습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getScheduleList = useCallback(async (calendarId: string) => {
    const accessToken = localStorage.getItem("access_token");
    const timeMin = "2022-07-01T00:00:00Z";
    const timeMax = "2022-07-31T00:00:00Z";
    if (accessToken !== null && accessToken !== undefined) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMax=${timeMax}&timeMin=${timeMin}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const responseData = (await response.json()) as GoogleCalendarEventList;
        setEvents(responseData);
      }
    }
  }, []);

  return (
    <RootContainer
      oauthUrl={oauthUrl}
      googleCalendarList={googleCalendarList}
      getGoogleCalendarList={getGoogleCalendarList}
      getAccessToken={getAccessToken}
      getScheduleList={getScheduleList}
    />
  );
}

export default RootIndex;
