import { GoogleCalendarEventList } from "../types/event";

const getEventList = async (
  accessToken: string,
  calendarId: string,
  start: string,
  end: string
) => {
  const encodeId = encodeURIComponent(calendarId);
  const url =
    `https://www.googleapis.com/calendar/v3/calendars/${encodeId}/events?` +
    `timeMin=${start}&` +
    `timeMax=${end}&` +
    `maxResults=50`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const apiResult = (await response.json()) as GoogleCalendarEventList;
    return apiResult;
  } else {
    console.log(response.statusText);
    console.log(await response.json());
    throw new Error();
  }
};

export { getEventList };
