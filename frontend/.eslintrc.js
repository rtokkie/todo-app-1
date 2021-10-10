module.exports = {
  extends: ['react-app', 'react-app/jest'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
}
