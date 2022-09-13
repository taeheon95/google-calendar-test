import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { GoogleCalendarList } from "../types/calendar";

const initialState: GoogleCalendarList = {
  etag: "",
  items: [],
  kind: "",
  nextSyncToken: "",
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarList: (
      state: GoogleCalendarList,
      action: PayloadAction<GoogleCalendarList>
    ) => {
      state = action.payload;
    },
  },
});
