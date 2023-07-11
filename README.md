# Eduzz Hooks: Antd React Hooks Form

[![version](https://img.shields.io/npm/v/@eduzz/ui-antd-hooks-form)](https://www.npmjs.com/package/@eduzz/ui-antd-hooks-form)
[![size](https://img.shields.io/bundlephobia/min/@eduzz/ui-antd-hooks-form)](https://www.npmjs.com/package/@eduzz/ui-antd-hooks-form)

Implementação padrão do **react-hook-form** para validação de formulário com AntD.

## Instalação

```bash
yarn add @eduzz/ui-antd-hooks-form
```

## Tecnologias

- [react-hook-form](https://react-hook-form.com)
- [yup](https://github.com/jquense/yup): Schema de validação

## Como usar

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

## Parametros

O único parametro especifico é o validationSchema, o resto é configuração padrão do [react-hook-form](https://react-hook-form.com/api/useform).

| prop             | tipo       | obrigatório | descrição                              |
| ---------------- | ---------- | ----------- | -------------------------------------- |
| validationSchema | `function` | `true`      | Utilizado para validação do formulário |

## Componentes

- [Input](https://github.com/eduzz/ui-hooks/blob/master/Input/index.md).
- [Textarea](https://github.com/eduzz/ui-hooks/blob/master/Textarea/index.md).
- [Select](https://github.com/eduzz/ui-hooks/blob/master/Select/index.md).
- [DatePicker](https://github.com/eduzz/ui-hooks/blob/master/DatePicker/index.md).
- [TimePicker](https://github.com/eduzz/ui-hooks/blob/master/TimePicker/index.md).
- [Checkbox](https://github.com/eduzz/ui-hooks/blob/master/Checkbox/index.md).
- [Radio](https://github.com/eduzz/ui-hooks/blob/master/Radio/index.md).
- [Switch](https://github.com/eduzz/ui-hooks/blob/master/Switch/index.md).
- [ErrorMessage](https://github.com/eduzz/ui-hooks/blob/master/ErrorMessage/index.md).
- [Form](https://github.com/eduzz/ui-hooks/blob/master/Form/index.md).

## Tipando o nome

Em todos os componentes é possível passar uma interface para poder tipar o name:

```tsx
<Input<FormModel<typeof form>> label='Name' name='name' />
<Input<User> label='Name' name='name' />
<Input<User> label='Name' name='nivel.0.name' />
```