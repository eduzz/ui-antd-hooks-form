import '../utils/dayjsConfig';

import { forwardRef, useRef, useCallback, useMemo, KeyboardEvent } from 'react';
import { FieldValues } from 'react-hook-form';

import { DatePicker as AndtDatePicker, DatePickerProps as AntdDatePickerProps } from 'antd';

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import withForm, { WithFormProps } from '../Form/withForm';
import dateMask from '../masks/date';

export type DatePickerProps<V extends FieldValues = FieldValues> = Omit<AntdDatePickerProps, 'value' | 'onChange'> &
  WithFormProps<any, V> & {
    minDate?: Date | null;
    maxDate?: Date | null;
    value?: Date | null;
    onChange?: (value: Date) => void;
    showTime?: boolean;
  };

const defaultFormats = {
  date: 'DD/MM/YYYY',
  datetime: 'DD/MM/YYYY HH:mm'
} as const;

const DatePicker = forwardRef<any, any>(
  ({ value, format: formatProp, showTime, minDate, maxDate, onChange, ...props }, ref) => {
    const format = formatProp ?? defaultFormats[`${showTime ? 'datetime' : 'date'}`];
    const maskTimeout = useRef<any>();

    const handleChange = useCallback((date: Dayjs) => onChange(date?.toDate()), [onChange]);

    const disableDate = useCallback(
      (date: Date | null) => {
        if (!date) return true;
        if (minDate) return date < minDate;
        if (maxDate) return date > maxDate;
        return false;
      },
      [maxDate, minDate]
    );

    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (formatProp || showTime) return;

        const input = e.target as HTMLInputElement;
        maskTimeout.current && clearTimeout(maskTimeout.current);
        maskTimeout.current = setTimeout(() => {
          input.value = dateMask.apply(input.value) ?? '';

          const result = dayjs(input.value, format);
          const sameFormat = input.value?.length === format.length;

          if (result.isValid() && sameFormat) {
            onChange(result.toDate());
            return;
          }

          !input.value && onChange(null);
        }, 0);
      },
      [format, formatProp, onChange, showTime]
    );

    const dayjsValue = useMemo(() => (value ? dayjs(value) : value), [value]);

    return (
      <AndtDatePicker
        ref={ref}
        disabledDate={disableDate}
        format={format}
        value={dayjsValue}
        showTime={showTime}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        {...props}
      />
    );
  }
);

export interface DatePickerComponent {
  <V extends FieldValues>(props: DatePickerProps<V>): JSX.Element;
}

export default withForm(DatePicker as any) as DatePickerComponent;
