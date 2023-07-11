import { ReactNode, forwardRef, useCallback } from 'react';

import { Switch as AndtSwitch, SwitchProps as AntdSwitchProps, Typography } from 'antd';
import type { SwitchChangeEventHandler } from 'antd/es/switch/index';

import styles from './styles.module.css';
import withForm, { WithFormProps } from '../Form/withForm';

export interface SwitchProps extends Omit<AntdSwitchProps, 'onChange' | 'value'>, WithFormProps<HTMLInputElement> {
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

export default withForm(Switch, { disableMargin: true });
