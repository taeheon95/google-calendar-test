import React, { useCallback, useMemo, useState } from "react";
import { GoogleCalendarItem } from "../../types/calendar";
import {
  GoogleCalendarEvent,
  GoogleCalendarEventList,
} from "../../types/event";
import { RRule, RRuleSet, rrulestr } from "rrule";
import Schedule from "../Schedule";

function CalendarContainer(props: GoogleCalendarItem) {
  const { id } = props;
  const [eventList, setEventList] = useState<GoogleCalendarEvent[]>([]);
  const timeMin = useMemo(() => {
    return new Date("2022-07-01T00:00:00Z");
  }, []);
  const timeMax = useMemo(() => {
    return new Date("2022-09-01T00:00:00Z");
  }, []);
  const getScheduleList = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token")!;
    if (accessToken !== null && accessToken !== undefined) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${id}/events?timeMax=${timeMax.toISOString()}&timeMin=${timeMin.toISOString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const responseData = (await response.json()) as GoogleCalendarEventList;
        console.log(responseData);
        const items = responseData.items;

        responseData.items.forEach((item) => {
          item.recurrence && processGoogleRepeatRule(item, items);
        });

        setEventList((state: GoogleCalendarEvent[]) => {
          return items;
        });
      }
    }
  }, []);

  const processGoogleRepeatRule = useCallback(
    (event: GoogleCalendarEvent, eventList: GoogleCalendarEvent[]) => {
      const recurrence = event?.recurrence?.at(0) ?? "";
      console.log(recurrence);

      const startDate = new Date(
        event.start.date ?? event.start.dateTime ?? ""
      );
      const dtstart = startDate.toISOString().replace(/(:|\-|(\.\d\d\d))/g, "");
      const repeatRule = RRule.fromString(`DTSTART:${dtstart}\n${recurrence}`);
      console.log(repeatRule.options);
      console.log(repeatRule);
      console.log(repeatRule.between(timeMin, timeMax));
      const endDate = new Date(event.end.date ?? event.end.dateTime ?? "");
      const diff = endDate.getTime() - startDate.getTime();
      const dateDiff = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
      );
      const repeatDates = repeatRule.between(timeMin, timeMax);
      console.log(repeatDates);
      repeatDates.forEach((date) => {
        eventList.push({
          ...event,
          id: `${event.id}_${date.toISOString()}`,
          start: { dateTime: date.toISOString(), timeZone: "" },
          end: {
            dateTime: new Date(date.getTime() + diff).toISOString(),
            timeZone: "",
          },
        });
      });
    },
    []
  );

  return (
    <div>
      <button onClick={getScheduleList}>일정 가져오기</button>
      {eventList?.map((event) => (
        <div key={event.id}>
          <span>{event.summary}</span>
          <div>
            <span>시작 : </span>
            <span>{event.start.date ?? event.start.dateTime ?? ""}</span>
          </div>
          <div>
            <span>종료 : </span>
            <span>{event.end.date ?? event.end.dateTime ?? ""}</span>
          </div>
          {event?.recurrence?.at(0) && (
            <div>
              <span>반복 규칙 : </span>
              <span>{event?.recurrence?.at(0) ?? ""}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CalendarContainer;
