import { GoogleListType, Reminder } from "./common";

export interface GoogleUser {
  id?: string;
  email: string;
  displayName?: string;
  self?: boolean;
}

export interface GoogleCalendarEventAttendee {
  id: string;
  email: string;
  displayName: string;
  organizer: boolean;
  self: boolean;
  resource: boolean;
  optional: boolean;
  responseStatus: string;
  comment: string;
  additionalGuests: number;
}

export interface GoogleCalendarEventTime {
  date?: string;
  dateTime?: string;
  timeZone: string;
}

export interface extendedProperty {
  private: {
    [key: string]: string;
  };
  shared: {
    [key: string]: string;
  };
}

export interface ConferenceData {
  createRequest: {
    requestId: string;
    conferenceSolutionKey: {
      type: string;
    };
    status: {
      statusCode: string;
    };
  };
  entryPoints: {
    entryPointType: string;
    uri: string;
    label: string;
    pin: string;
    accessCode: string;
    meetingCode: string;
    passcode: string;
    password: string;
  }[];
  conferenceSolution: {
    key: { type: string };
    name: string;
    iconUri: string;
  };
  conferenceId: string;
  signature: string;
  notes: string;
}

export interface Gadget {
  type: string;
  title: string;
  link: string;
  iconLink: string;
  width: number;
  height: number;
  display: string;
  preferences: {
    [key: string]: string;
  };
}

export interface Reminders {
  useDefault: boolean;
  overrides?: Reminder[];
}

export interface CalendarEventSource {
  url: string;
  title: string;
}

export interface CalendarEventAttachment {
  fileUrl: string;
  title: string;
  mimeType: string;
  iconLink: string;
  fileId: string;
}

export interface GoogleCalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: GoogleUser;
  organizer: GoogleUser;
  start: GoogleCalendarEventTime;
  end: GoogleCalendarEventTime;
  transparency: string;
  iCalUID: string;
  sequence: number;
  reminders: Reminders;
  eventType: string;
  description?: string;
  location?: string;
  colorId?: string;
  endTimeUnspecified?: boolean;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: GoogleCalendarEventTime;
  visibility?: string;
  attendees?: GoogleCalendarEventAttendee[];
  attendeesOmitted?: boolean;
  extendedProperties?: extendedProperty;
  hangoutLink?: string;
  conferenceData?: ConferenceData;
  gadget?: Gadget;
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  source?: CalendarEventSource;
  attachments?: CalendarEventAttachment[];
}

export interface GoogleCalendarEventList
  extends GoogleListType<GoogleCalendarEvent> {
  summary: string;
  timeZone: string;
  updated: string;
  accessRole: string;
  defaultReminders: Reminder;
}
