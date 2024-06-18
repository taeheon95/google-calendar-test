import React, { MouseEventHandler, useCallback, useState, memo } from "react";
import { GoogleCalendarList } from "../../types/calendar";
import { GoogleCalendarEventList } from "../../types/event";
import Calendar from "../../components/Calendar";
import { DateTime } from "luxon";
import DateSelector from "../../components/DateSelector";

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

  const [period, setPeriod] = useState({
    from: DateTime.now().startOf("day"),
    to: DateTime.now().startOf("day").plus({ days: 1 }),
  });
  const [isSynced, setIsSynced] = useState<boolean>(() => {
    const refresh_token = localStorage.getItem("refresh_token");
    const access_token = localStorage.getItem("access_token");
    if (refresh_token && access_token) {
      return true;
    } else {
      return false;
    }
  });
  const onChangePeriod = useCallback(
    ({ name, value }: { name: string; value: string }) => {
      setPeriod((state) => ({
        ...state,
        [name]: DateTime.fromISO(value),
      }));
    },
    []
  );

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
      <div>
        <DateSelector
          name="from"
          value={period.from.toISODate()}
          onChange={onChangePeriod}
        >
          시작
        </DateSelector>
        <DateSelector
          name="to"
          value={period.to.toISODate()}
          onChange={onChangePeriod}
        >
          종료
        </DateSelector>
      </div>
      {googleCalendarList?.items?.map((calendar) => {
        return (
          <div key={calendar.id}>
            {calendar.summary}
            <Calendar period={period} {...calendar} />
          </div>
        );
      })}
    </div>
  );
}

export default memo(RootContainer);
