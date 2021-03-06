module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    'sourceType': 'module'
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-inferrable-types': [
      'warn', {
        'ignoreParameters': true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};
