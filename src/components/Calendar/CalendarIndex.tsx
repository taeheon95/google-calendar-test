import React from "react";
import { GoogleCalendarItem } from "../../types/calendar";
import CalendarContainer from "./CalendarContainer";

function CalendarIndex(props: GoogleCalendarItem) {
  return <CalendarContainer {...props} />;
}

export default CalendarIndex;
