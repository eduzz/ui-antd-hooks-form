import { ReactNode, forwardRef, useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

import { Switch as AndtSwitch, SwitchProps as AntdSwitchProps, Typography } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/es/switch/index';

import styles from './styles.module.css';
import withForm, { WithFormProps } from '../Form/withForm';

export interface SwitchProps<V extends FieldValues = FieldValues>
  extends Omit<AntdSwitchProps, 'onChange' | 'value'>,
    WithFormProps<HTMLInputElement, V> {
  value?: any;
  onChange?: (value: any) => void;
  checkedValue?: any;
  children?: ReactNode;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ value, onChange, checkedValue = true, children, className, ...props }, ref) => {
    const handleChange: SwitchChangeEventHandler = useCallback(
      checked => {
        const newValue = checked ? checkedValue : typeof checkedValue === 'boolean' ? !checkedValue : null;
        onChange?.(newValue);
      },
      [checkedValue, onChange]
    );

    return (
      <div className={`${className} ${styles['eduzz-ui-antd-hooks-form-switch']}`}>
        <AndtSwitch ref={ref} checked={value === checkedValue} {...props} onChange={handleChange} />
        <div>{typeof children === 'string' ? <Typography.Text>{children}</Typography.Text> : children}</div>
      </div>
    );
  }
);

export interface SwitchComponent {
  <V extends FieldValues>(props: SwitchProps<V>): JSX.Element;
}

export default withForm(Switch, { disableMargin: true }) as SwitchComponent;
