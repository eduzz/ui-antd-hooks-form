# Switch

[Switch do Antd](https://ant.design/components/Switch/) com a
configuração do [react-form-hook](https://react-hook-form.com).

### Importação

```js
import Switch from '@eduzz/ui-antd-hooks-form/Switch';
```

### Switch Props

Todas as props do Switch do Antd são validos, abaixos as props extras.

| prop         | tipo        | obrigatório | padrão | descrição                                                                           |
| ------------ | ----------- | ----------- | ------ | ----------------------------------------------------------------------------------- |
| name         | `string`    | `false`     | -      | O name é importante para poder linkar o campo com o formulário                      |
| checkedValue | `any`       | `false`     | true   | Valor customizado se checked                                                        |
| children     | `ReactNode` | `false`     | -      | Label do switch                                                                     |
| help         | `string`    | `false`     | -      | Exibe texto de ajuda abaixo do componente de texto.                                 |
| error        | `string`    | `false`     | -      | Exibe uma mensagem de erro no componente de texto, assim como indica erro no campo. |
