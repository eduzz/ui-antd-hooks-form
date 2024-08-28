const { ignores, configs } = require('@eduzz/eslint-config/react');

/** @type import('eslint').Linter.Config[] */
module.exports = [
  ...configs,
  {
    ignores: ignores(),
    rules: {
      '@typescript-eslint/no-unused-expressions': ['off']
    }
  }
];
