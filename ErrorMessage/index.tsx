import { memo } from 'react';
import { FieldPath, FieldValues, useFormState } from 'react-hook-form';

import { Typography } from 'antd';

import { ErrorMessage as ErrorMessageHook } from '@hookform/error-message';

export interface ErrorMessageProps<V extends FieldValues = FieldValues>
  extends Omit<React.ComponentProps<typeof Typography.Text>, 'children'> {
  name: FieldPath<V>;
}

const ErrorMessage = ({ name, ...props }: ErrorMessageProps) => {
  const formState = useFormState({ name, exact: true });

  return (
    <ErrorMessageHook
      errors={formState.errors}
      name={name}
      render={({ message }) => (
        <Typography.Text type='danger' {...props}>
          {message}
        </Typography.Text>
      )}
    />
  );
};

export interface ErrorMessageComponent {
  <V extends FieldValues>(props: ErrorMessageProps<V>): JSX.Element;
}

export default memo(ErrorMessage) as ErrorMessageComponent;
