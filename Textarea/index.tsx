import { RefAttributes, ChangeEvent, ForwardRefExoticComponent, forwardRef, useCallback, FocusEvent } from 'react';
import { FieldValues } from 'react-hook-form';

import { Input as AntdInput } from 'antd';
import type { TextAreaProps as AntdTextAreaProps, TextAreaRef } from 'antd/lib/input/TextArea';

import withForm, { WithFormProps } from '../Form/withForm';

export interface TextareaProps<V extends FieldValues = FieldValues>
  extends Omit<AntdTextAreaProps, 'onChange' | 'onBlur' | 'name'>,
    WithFormProps<TextAreaRef, V>,
    RefAttributes<TextAreaRef> {
  onChange?: (value: string | number | null | undefined, event: ChangeEvent<HTMLTextAreaElement>) => any;
  onBlur?: (value: string | number | null | undefined, event: FocusEvent<HTMLTextAreaElement>) => any;
}

const Textarea: ForwardRefExoticComponent<TextareaProps> = forwardRef<TextAreaRef, TextareaProps>(
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

export interface TextareaComponent {
  <V extends FieldValues>(props: TextareaProps<V>): JSX.Element;
}
export default withForm(Textarea) as TextareaComponent;
