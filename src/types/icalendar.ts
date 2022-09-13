export default interface RepeatRule {
  FREQ?:
    | "YEARLY"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "MINUTELY"
    | "HOURLY"
    | "SECONDLY";
  BYMONTH?: string;
  BYWEEKNO?: string;
  BYYEARDAY?: string;
  BYDAY?: string;
  BYHOUR?: string;
  BYMINUTE?: string;
  BYSECOND?: string;
  BYSETPOS?: string;
  UNTIL?: string;
  WKST?: string;
  COUNT?: string;
}
