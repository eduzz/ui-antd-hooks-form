# Checkbox

[Checkbox do Antd](https://ant.design/components/Checkbox/) com a
configuração do [react-form-hook](https://react-hook-form.com).

### Importação

```js
import Checkbox from '@eduzz/ui-antd-hooks-form/Checkbox';
```

### Checkbox Props

Todas as props do Checkbox do Antd são validos, abaixos as props extras.

| prop         | tipo      | obrigatório | padrão | descrição                                                                           |
| ------------ | --------- | ----------- | ------ | ----------------------------------------------------------------------------------- |
| name         | `string`  | `false`     | -      | O name é importante para poder linkar o campo com o formulário                      |
| multiple     | `boolean` | `false`     | -      | O valor será um array                                                               |
| checkedValue | `any`     | `false`     | true   | Valor customizado se checked                                                        |
| help         | `string`  | `false`     | -      | Exibe texto de ajuda abaixo do componente de texto.                                 |
| error        | `string`  | `false`     | -      | Exibe uma mensagem de erro no componente de texto, assim como indica erro no campo. |
