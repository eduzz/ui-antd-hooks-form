import './styles.css';

import { ReactNode, useCallback } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  id?: string;
  className?: string;
  children?: ReactNode;
  context: UseFormReturn<T, any>;
  onSubmit: (data: any) => void | Promise<any>;
}

const Form = <T extends FieldValues>({ context, onSubmit, ...rest }: FormProps<T>) => {
  const handleReset = useCallback(() => context.reset(), [context]);

  // https://github.com/react-hook-form/react-hook-form/issues/10101
  const onSubmitFixer = useCallback(
    async (data: any) => {
      try {
        await onSubmit(data);
      } catch {}
    },
    [onSubmit]
  );

  return (
    <FormProvider {...context}>
      <form {...rest} onReset={handleReset} onSubmit={context.handleSubmit(onSubmitFixer)} noValidate />
    </FormProvider>
  );
};

export default Form;
