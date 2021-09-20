const types = ['feat', 'docs', 'fix', 'update', 'test'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [0],
    'scope-empty': [0],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types],
  },
};
