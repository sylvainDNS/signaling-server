module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-trailing-spaces': 'error',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        trailingComma: 'es5',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
      },
    ],
    'spaced-comment': ['error', 'always'],
  },
}
