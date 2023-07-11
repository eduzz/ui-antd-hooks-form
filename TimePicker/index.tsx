import '../utils/dayjsConfig';

import { forwardRef, useCallback, useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

import { TimePicker as AndtTimePicker, TimePickerProps as AntdTimePickerProps } from 'antd';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import withForm, { WithFormProps } from '../Form/withForm';

export type TimePickerProps<V extends FieldValues> = Omit<AntdTimePickerProps, 'value' | 'onChange'> &
  WithFormProps<any, V> & {
    minDate?: Date;
    maxDate?: Date;
    value?: Date;
    onChange?: (value: Date) => void;
  };

const TimePicker = forwardRef<any, any>(({ value, format, showTime, minDate, maxDate, onChange, ...props }, ref) => {
  format = format ?? props.showSecond ? 'HH:mm:ss' : 'HH:mm';

  const handleChange = useCallback((date: Dayjs) => onChange(date.toDate()), [onChange]);

  const disableDate = useCallback(
    (date: Date | null) => {
      if (!date) return true;
      if (minDate) return date < minDate;
      if (maxDate) return date > maxDate;
      return false;
    },
    [maxDate, minDate]
  );

  const dayjsValue = useMemo(() => (value ? dayjs(value) : value), [value]);

  return (
    <AndtTimePicker
      ref={ref}
      disabledDate={disableDate}
      format={format}
      value={dayjsValue}
      showTime={showTime}
      onChange={handleChange}
      {...props}
    />
  );
});

export interface TimePickerComponent {
  <V extends FieldValues>(props: TimePickerProps<V>): JSX.Element;
}

export default withForm(TimePicker as any) as TimePickerComponent;
