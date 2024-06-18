import React, { useCallback } from "react";

interface Props {
  name: string;
  value: string;
  onChange: ({ name, value }: { name: string; value: string }) => void;
  children: React.ReactNode;
}

function DateSelector(props: Props) {
  const { name, value, onChange, children } = props;
  const handleDateValue = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    onChange({
      name: e.target.name,
      value: e.target.value,
    });
  }, []);

  return (
    <label>
      {children}
      <input type="date" name={name} value={value} onChange={handleDateValue} />
    </label>
  );
}

export default React.memo(DateSelector);
