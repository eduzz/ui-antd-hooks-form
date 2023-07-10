# Eduzz Hooks: Antd React Hooks Form

[![version](https://img.shields.io/npm/v/@eduzz/ui-antd-hooks-form)](https://www.npmjs.com/package/@eduzz/ui-antd-hooks-form)
[![size](https://img.shields.io/bundlephobia/min/@eduzz/ui-antd-hooks-form)](https://www.npmjs.com/package/@eduzz/ui-antd-hooks-form)

Implementação padrão do **react-hook-form** para validação de formulário com AntD.

### Instalação

```bash
yarn add @eduzz/ui-antd-hooks-form
```

### Técnologias

- [react-hook-form](https://react-hook-form.com)
- [yup](https://github.com/jquense/yup): Schema de validação

### Importação

```js
import useForm from '@eduzz/ui-antd-hooks-form/useForm';
```

### Como usar

> Não é necessário o register de cada componente quando o **Form** componente é instanciado.

```tsx
import useForm, { FormModel } from '@eduzz/ui-antd-hooks-form/useForm';

const form = useForm({
  defaultValues: {
    // Não é necessário iniciar os valores
    money: 5
  },
  validationSchema: yup =>  {
    // Caso não use uma schema pronto o yup será passado via arg
    return yup.object({
      name: yup.string(),
      money: yup.number().min(10)
    }),
  }
});

// O FormModel é útil caso tenha criado uma schema nova no validationSchema
// do contrário o ideal é o infer do yup.
const onSubmit = useCallback((data: FormModel<typeof form>) => console.log({data}))

<Form context={form} onSubmit={data => console.log(data)}>
  <Input label='Name' name='name' />
  <Currency label='Money' name='money' />

  <Button type='submit'>Submit</Button>
</Form>
```

### Parametros

O único parametro especifico é o validationSchema, o resto é configuração padrão do [react-hook-form](https://react-hook-form.com/api/useform).

| prop             | tipo       | obrigatório | descrição                              |
| ---------------- | ---------- | ----------- | -------------------------------------- |
| validationSchema | `function` | `true`      | Utilizado para validação do formulário |

