import { RefAttributes, ChangeEvent, ForwardRefExoticComponent, forwardRef, useCallback, FocusEvent } from 'react';

import { Input as AntdInput } from 'antd';
import type { TextAreaProps as AntdTextAreaProps, TextAreaRef } from 'antd/lib/input/TextArea';

import withForm, { WithFormProps } from '../Form/withForm';

export interface TextAreaProps
  extends Omit<AntdTextAreaProps, 'onChange' | 'onBlur'>,
    WithFormProps<TextAreaRef>,
    RefAttributes<TextAreaRef> {
  onChange?: (value: string | number | null | undefined, event: ChangeEvent<HTMLTextAreaElement>) => any;
  onBlur?: (value: string | number | null | undefined, event: FocusEvent<HTMLTextAreaElement>) => any;
}

const Textarea: ForwardRefExoticComponent<TextAreaProps> = forwardRef<TextAreaRef, TextAreaProps>(
  ({ value, onChange, onBlur, ...props }, ref) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange && onChange(e.target.value, e);
      },
      [onChange]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLTextAreaElement>) => {
        onBlur && onBlur(e.target.value, e);
      },
      [onBlur]
    );

    return (
      <AntdInput.TextArea ref={ref} value={value} onChange={handleChange} onBlur={handleBlur} rows={4} {...props} />
    );
  }
);

export default withForm(Textarea);
