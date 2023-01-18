module.exports = {
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.json': ['prettier --write'],
};
