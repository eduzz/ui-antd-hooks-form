import { forwardRef, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import { Checkbox as AndtCheckbox, CheckboxProps as AntdCheckboxProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox/index';

import withForm, { WithFormProps } from '../Form/withForm';

export interface CheckboxProps<V extends FieldValues = FieldValues>
  extends Omit<AntdCheckboxProps, 'onChange' | 'value' | 'name'>,
    WithFormProps<HTMLInputElement, V> {
  value?: any;
  onChange?: (value: any) => void;
  multiple?: boolean;
  checkedValue?: any;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ value, onChange, multiple, checkedValue = true, ...props }, ref) => {
    const handleChange = useCallback(
      (e: CheckboxChangeEvent) => {
        if (!onChange) return;

        const checked = e.target.checked;
        const newValue = checked ? checkedValue : typeof checkedValue === 'boolean' ? !checkedValue : null;

        if (!multiple) {
          onChange(newValue);
          return;
        }

        const result = new Set([newValue, ...(value ?? []).filter((v: any) => v !== checkedValue)].filter(v => !!v));
        onChange(Array.from(result));
      },
      [checkedValue, multiple, value, onChange]
    );

    const checked = Array.isArray(value) ? value?.includes(checkedValue) : value === checkedValue;
    return <AndtCheckbox ref={ref} checked={checked ?? false} {...props} onChange={handleChange} />;
  }
);

export interface CheckboxComponent {
  <V extends FieldValues>(props: CheckboxProps<V>): JSX.Element;
}

export default withForm(Checkbox, { disableMargin: true }) as CheckboxComponent;
