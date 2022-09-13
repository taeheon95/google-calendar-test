type ACCESS_ROLE = "writer" | "owner" | "reader";

export interface GoogleCalendarReminder {
  method: string;
  minutes: number;
}

export interface GoogleCalendarNotificationSetting {
  type: string;
  method: string;
}

export interface GoogleCalendarList {
  etag: string;
  items: GoogleCalendarItem[];
  kind: string;
  nextSyncToken: string;
}

export interface GoogleCalendarItem {
  id: string;
  seletcted: boolean;
  kind: string;
  etag: string;
  accessRole: ACCESS_ROLE;
  timeZone: string;
  summary: string;
  summaryOverride: string;
  foregroundColor: string;
  backgroundColor: string;
  colorId: string;
  conferenceProperties: { allowedConferenceSolutionTypes: string[] };
  defaultReminders: GoogleCalendarReminder[];
  primary?: boolean;
  notificationSettings: GoogleCalendarNotificationSetting[];
}
