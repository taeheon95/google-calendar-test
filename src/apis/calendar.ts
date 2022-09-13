import { useCallback } from "react";
import { GoogleCalendarList } from "../types/calendar";

const googleCalendarUri = "https://www.googleapis.com/calendar/v3";

const getGoogleCalendarList = async (accessToken: string) => {
  const response = await fetch(`${googleCalendarUri}/users/me/calendarList`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.ok) {
    return (await response.json()) as GoogleCalendarList;
  } else {
    console.error(response);
    throw new Error(response.statusText);
  }
};

export { getGoogleCalendarList };
