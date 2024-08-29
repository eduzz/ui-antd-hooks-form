import { ReactNode, ComponentType, forwardRef } from 'react';
import { Controller, useFormContext, FieldPath, FieldValues } from 'react-hook-form';

import { Form as AntdForm } from 'antd';

export type WithFormProps<R, V extends FieldValues = FieldValues> = {
  label?: string;
  name?: FieldPath<V>;
  disabled?: boolean;
  _genericRef?: R;
  help?: ReactNode;
  error?: string;
  required?: boolean;
};

const withForm = <P extends WithFormProps<any>>(Component: ComponentType<P>, options?: { disableMargin: boolean }) =>
  forwardRef<P['_genericRef'], Omit<P, '_genericRef'>>(
    ({ name, disabled, label, help, error, required, ...props }, ref) => {
      const form = useFormContext();

      if (!form || !name) {
        return (
          <AntdForm.Item
            label={label}
            labelCol={{ span: 24 }}
            validateStatus={error ? 'error' : undefined}
            required={required}
            help={error ?? help}
          >
            <Component {...(props as any)} name={name} disabled={disabled} ref={ref} />
          </AntdForm.Item>
        );
      }

      return (
        <Controller
          control={form.control}
          name={name}
          render={({ field, fieldState, formState }) => (
            <AntdForm.Item
              label={label}
              style={options?.disableMargin ? { marginBottom: 0 } : undefined}
              labelCol={{ span: 24 }}
              validateStatus={fieldState?.error?.message ? 'error' : undefined}
              help={error ?? fieldState?.error?.message ?? help}
              required={required}
            >
              <Component
                {...(props as any)}
                {...field}
                onBlur={(value: any, e: any) => {
                  field.onBlur();
                  (props as any)?.onBlur?.(value, e);
                }}
                disabled={disabled || formState?.isSubmitting || formState?.isLoading}
                ref={ref}
              />
            </AntdForm.Item>
          )}
        />
      );
    }
  );

export default withForm;
