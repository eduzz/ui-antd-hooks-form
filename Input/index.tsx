import { ChangeEvent, forwardRef, useCallback, createElement, FocusEvent, KeyboardEvent } from 'react';

import { Input as AntdInput, InputProps as AntdInputProps, InputRef } from 'antd';

import withForm, { WithFormProps } from '../Form/withForm';
import useMask, { BuildInMasks, MaskAdapter } from '../masks';

export interface InputProps
  extends Omit<AntdInputProps, 'onChange' | 'onBlur' | 'onPressEnter'>,
    WithFormProps<InputRef> {
  password?: boolean;
  mask?: BuildInMasks | MaskAdapter;
  onChange?: (value: string | number | null | undefined, event: ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (value: string | number | null | undefined, event: FocusEvent<HTMLInputElement>) => any;
  onPressEnter?: (value: string | number | null | undefined) => any;
}

const Input = forwardRef<InputRef, InputProps>(
  ({ mask, value, onChange, onBlur, onPressEnter, password, ...props }, ref) => {
    const { maskClean, maskedValue } = useMask(mask, value);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const cleanValue = maskClean(e.currentTarget.value);
        onChange && onChange(cleanValue === '' ? null : cleanValue, e);
      },
      [maskClean, onChange]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(maskClean(e.currentTarget.value), e);
      },
      [onBlur, maskClean]
    );

    const handlePressEnter = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (e.key === 'Enter' && onPressEnter) {
          e.preventDefault();
          onPressEnter(maskClean(target.value));
        }
      },
      [onPressEnter, maskClean]
    );

    return createElement(password ? AntdInput.Password : AntdInput, {
      ref,
      value: maskedValue,
      onChange: handleChange,
      onBlur: handleBlur,
      onPressEnter: handlePressEnter,
      prefix: mask === 'money' ? 'R$' : undefined,
      ...props
    });
  }
);

export default withForm(Input);
