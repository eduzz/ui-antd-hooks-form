import { forwardRef } from 'react';
import { FieldValues } from 'react-hook-form';

import { Select as AndtSelect, SelectProps as AntdSelectProps, RefSelectProps } from 'antd';

import withForm, { WithFormProps } from '../Form/withForm';
import nestedComponent from '../utils/nestedComponent';

export interface SelectProps<V extends FieldValues = FieldValues>
  extends Omit<AntdSelectProps, 'onChange'>,
    WithFormProps<RefSelectProps, V> {}

const Select = forwardRef<RefSelectProps, SelectProps>(({ value, ...props }, ref) => {
  return <AndtSelect ref={ref} value={value} {...props} />;
});

export interface SelectComponent {
  <V extends FieldValues>(props: SelectProps<V>): JSX.Element;
}

export default nestedComponent(withForm(Select) as SelectComponent, {
  Option: AndtSelect.Option,
  OptGroup: AndtSelect.OptGroup
});
