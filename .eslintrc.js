module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/strict-type-checked"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    node: true,
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/switch-exhaustiveness-check": "error"
  }
};
