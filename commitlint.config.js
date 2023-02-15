module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'perf', 'refactor']],
    'subject-case': [2, 'always', ['sentence-case']], // Override @commitlint/config-conventional
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*):\s(MAN-\d{1,5}\s)+(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};
