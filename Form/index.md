# Form

Componente de formulário de alto desempenho com gerenciamento de escopo de dados.

## Importação

```js
import Form from '@eduzz/ui-antd-hooks-form/Form';
```

## Exemplo

Exemplo de uso [aqui](/houston/forms/example).

## Contexto interno

Utilizado internamente no componente `<Form />`. Recomendado o uso apenas para compartilhar o estado do formulário com os componentes filhos.

```js
import Form from '@eduzz/ui-antd-hooks-form/Form';
import useForm from '@eduzz/ui-antd-hooks-form/useForm';

const Component = () => {
const form = useForm({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required()
      })
  });

  const onSubmit = React.useCallback((data: FormModel<typeof form>) => {
    console.log({ data })
  }, []);

  return (
    <Form context={form}>
      <SubComponent />
    </Form>
  );
}

const SubComponent = () => {
  const form = useFormContext();
  ...
};
```

| prop      | tipo                             | obrigatório | padrão | descrição |
| --------- | -------------------------------- | ----------- | ------ | --------- |
| id        | `string`                         | `false`     | -      |           |
| className | `string`                         | `false`     | -      |           |
| context   | `react-hook-form useForm return` | `true`      | -      | -         |
| onSubmit  | `function`                       | `true`      | -      | -         |
