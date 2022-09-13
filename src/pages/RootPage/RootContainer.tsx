import React, { MouseEventHandler, useCallback, useState, memo } from "react";
import CalendarContainer from "../../components/Calendar/CalendarContainer";
import { GoogleCalendarList } from "../../types/calendar";
import { GoogleCalendarEventList } from "../../types/event";

interface Prop {
  oauthUrl: string;
  googleCalendarList?: GoogleCalendarList;
  getGoogleCalendarList: (accessToken: string) => Promise<void>;
  getAccessToken: () => Promise<void>;
  getScheduleList: (calendarId: string) => Promise<void>;
}

function RootContainer(props: Prop) {
  const {
    oauthUrl,
    googleCalendarList,
    getGoogleCalendarList,
    getAccessToken,
    getScheduleList,
  } = props;

  const [isSynced, setIsSynced] = useState<boolean>(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    if (refresh_token && access_token) {
      return true;
    } else {
      return false;
    }
  });

  const handleSyncGoogle = useCallback<MouseEventHandler>(() => {
    if (!isSynced) {
      location.href = oauthUrl;
    }
    setIsSynced(!isSynced);
  }, [isSynced]);

  const handleDisSyncGoogle = useCallback<MouseEventHandler>(() => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    setIsSynced(false);
  }, []);

  const handleGetGoogleCalendarList = useCallback<MouseEventHandler>(() => {
    const access_token = localStorage.getItem("access_token") ?? "";
    getGoogleCalendarList(access_token);
  }, []);

  return (
    <div>
      <button onClick={isSynced ? handleDisSyncGoogle : handleSyncGoogle}>
        {isSynced ? "구글 연동 해제" : "구글 연동"}
      </button>
      <button onClick={getAccessToken}>access 토큰 가져오기</button>
      <button disabled={!isSynced} onClick={handleGetGoogleCalendarList}>
        구글 캘린더 리스트 가져오기
      </button>
      {googleCalendarList?.items?.map((calendar) => {
        return (
          <div key={calendar.id}>
            {calendar.summary}
            <CalendarContainer {...calendar} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(RootContainer);
