module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'no-nested-ternary': 0,
    'next-line indent': 0,
    'indent': 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 0
  },
};
