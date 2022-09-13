import React, { useEffect, useMemo, useState } from "react";
import SchedulePresenter from "./SchedulePresenter";

export interface Props {
  id: string;
  summary: string;
  start: string;
  end: string;
  recurrence?: string;
}

function ScheduleContainer(props: Props) {
  const { id, start, end, recurrence } = props;

  const [repeatRule, setRepeatRule] = useState(() => {
    const idx = recurrence?.indexOf(":");
    const rrule = recurrence?.substring((idx ?? 0) + 1);
    const objRrule = {};
    rrule?.split(";").forEach((rule) => {
      const [key, value] = rule.split("=");
      // @ts-ignore
      objRrule[key] = value;
    });
    console.log(objRrule);
    return objRrule;
  });

  useEffect(() => {
    console.log(recurrence);
    const idx = recurrence?.indexOf(":");
    const rrule = recurrence?.substring((idx ?? 0) + 1);
    console.log(rrule);
  }, []);

  useEffect(() => {
    console.log(repeatRule);
  }, [repeatRule]);

  useEffect(() => {
    if (recurrence) {
      const firstDate = new Date(start);
      const secondDate = new Date(
        firstDate.getFullYear(),
        firstDate.getMonth(),
        firstDate.getDate() + 7
      );
      console.log("first", firstDate);
      console.log("second", secondDate);
    } else {
    }
  }, []);

  return <SchedulePresenter {...props} />;
}

export default ScheduleContainer;
