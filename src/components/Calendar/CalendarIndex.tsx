import React from "react";
import { GoogleCalendarItem } from "../../types/calendar";
import CalendarContainer from "./CalendarContainer";
import { DateTime } from "luxon";

interface Props extends GoogleCalendarItem {
  period: {
    from: DateTime;
    to: DateTime;
  };
}

function CalendarIndex(props: Props) {
  return <CalendarContainer {...props} />;
}

export default CalendarIndex;
