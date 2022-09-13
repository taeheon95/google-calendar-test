import React from "react";
import { Props } from "./ScheduleContainer";

function SchedulePresenter(props: Props) {
  const { id, summary, start, end, recurrence } = props;
  return (
    <div>
      <span>{summary}</span>
      <div>
        <span>시작 : </span>
        <span>{start ?? ""}</span>
      </div>
      <div>
        <span>종료 : </span>
        <span>{end ?? ""}</span>
      </div>
      {recurrence && (
        <div>
          <span>반복 규칙 : </span>
          <span>{recurrence}</span>
        </div>
      )}
    </div>
  );
}

export default SchedulePresenter;
