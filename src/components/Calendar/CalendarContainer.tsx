import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GoogleCalendarItem } from "../../types/calendar";
import {
  GoogleCalendarEvent,
  GoogleCalendarEventList,
} from "../../types/event";
import { RRule, RRuleSet, rrulestr } from "rrule";
import Schedule from "../Schedule";
import { getEventList } from "../../apis/event";
import { DateTime } from "luxon";

interface Props extends GoogleCalendarItem {
  period: {
    from: DateTime;
    to: DateTime;
  };
}

function CalendarContainer(props: Props) {
  const { id, period } = props;
  const [eventList, setEventList] = useState<GoogleCalendarEvent[]>([]);
  const timeMin = `${period.from.toJSDate().toISOString()}`;
  const timeMax = `${period.to.toJSDate().toISOString()}`;
  const getScheduleList = useCallback(async () => {
    const accessToken = localStorage.getItem("access_token")!;
    if (accessToken !== null && accessToken !== undefined) {
      const result = await getEventList(accessToken, id, timeMin, timeMax);
      result.items.forEach((item) => {
        item.recurrence && processGoogleRepeatRule(item, result.items);
      });
      setEventList(result.items);
    }
  }, []);

  useEffect(() => {}, [eventList]);

  const processGoogleRepeatRule = useCallback(
    (event: GoogleCalendarEvent, eventList: GoogleCalendarEvent[]) => {
      const startDate = new Date(
        event.start.date ?? event.start.dateTime ?? ""
      );
      const dtstart = `DTSTART:${startDate
        .toISOString()
        .replace(/(:|\-|(\.\d\d\d))/g, "")}`;
      if (event.recurrence) {
        const rruleSetStr = [dtstart, ...event.recurrence].join("\n");
        const rruleSet = rrulestr(rruleSetStr);
        const endDate = new Date(event.end.date ?? event.end.dateTime ?? "");
        if (rruleSet.options.freq === RRule.YEARLY) {
          const rrule = new RRule({
            ...rruleSet.options,
            bymonthday: startDate.getDate(),
          });
          console.log(rrule.toString());
          const rDates = rrule.between(
            period.from.toJSDate(),
            period.to.toJSDate()
          );
          console.log(rDates);
        }
        const repeatDates = rruleSet.between(
          period.from.toJSDate(),
          period.to.toJSDate()
        );
        // const rrule = rruleSet.all();
        const diff = endDate.getTime() - startDate.getTime();
        const dateDiff = Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
        );
      }
      // repeatDates.forEach((date) => {
      //   eventList.push({
      //     ...event,
      //     id: `${event.id}_${date?.toISOString()}`,
      //     start: { dateTime: date?.toISOString(), timeZone: '' },
      //     end: {
      //       dateTime: new Date(date.getTime() + diff).toISOString(),
      //       timeZone: '',
      //     },
      //   });
      // });
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
            <span>{event.start?.date ?? event.start?.dateTime ?? ""}</span>
          </div>
          <div>
            <span>종료 : </span>
            <span>{event.end?.date ?? event.end?.dateTime ?? ""}</span>
          </div>
          {event?.recurrence?.at(0) && (
            <div>
              <span>반복 규칙 : </span>
              <span>{event?.recurrence?.join("\n")}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CalendarContainer;
