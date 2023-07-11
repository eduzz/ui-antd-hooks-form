import { forwardRef, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import { Radio as AndtRadio, RadioProps as AntdRadioProps } from 'antd';
import type { RadioChangeEvent } from 'antd/es/radio/index';

import withForm, { WithFormProps } from '../Form/withForm';

export interface RadioProps<V extends FieldValues = FieldValues>
  extends Omit<AntdRadioProps, 'onChange' | 'value' | 'name'>,
    WithFormProps<HTMLInputElement, V> {
  value?: any;
  onChange?: (value: any) => void;
  checkedValue?: any;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ value, onChange, checkedValue = true, ...props }, ref) => {
  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      const checked = e.target.checked;
      const newValue = checked ? checkedValue : typeof checkedValue === 'boolean' ? !checkedValue : null;
      onChange?.(newValue);
    },
    [checkedValue, onChange]
  );

  return <AndtRadio ref={ref} checked={value === checkedValue} {...props} onChange={handleChange} />;
});

export interface RadioComponent {
  <V extends FieldValues>(props: RadioProps<V>): JSX.Element;
}

export default withForm(Radio, { disableMargin: true }) as RadioComponent;
