export interface GoogleListType<T> {
  kind: string;
  etag: string;
  items: T[];
  nextPageToken?: string;
  nextSyncToken: string;
}

export interface Reminder {
  method: string;
  minutes: number;
}
