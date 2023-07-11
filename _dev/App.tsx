import { useCallback, useState } from 'react';

import { Space, Button } from 'antd';

import { Form, FormModel, Input, Select, useForm } from '..';

function App() {
  const form = useForm({
    defaultValues: { money: 5 }, //estado inicial, não precisa passar todas as propriedades
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required(),
        money: yup.number().required().min(10),
        option: yup.number().required().min(3)
      })
  });
  const onSubmit = useCallback((data: FormModel<typeof form>) => {
    console.log({ data });
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('saved!');
        resolve(null);
      }, 3000);
    });
  }, []);
  const [options] = useState(() => [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3 (disabled)', disabled: true }, // é possível desativar alguma opção
    { value: 4, label: 'Option 4' },
    { value: 5, label: 'Option 5' }
  ]);
  return (
    <Form context={form} onSubmit={onSubmit}>
      <Input<FormModel<typeof form>> label='Name' name='name' />
      <Input label='Money' name='money' mask='money' />
      <Select<FormModel<typeof form>> label='Options' name='option' options={options} />
      <Space>
        <Button htmlType='submit' type='primary' loading={form.formState.isSubmitting}>
          Submit
        </Button>
        <Button danger type='text' htmlType='reset' disabled={form.formState.isSubmitting}>
          Reset
        </Button>
      </Space>
    </Form>
  );
}

export default App;
