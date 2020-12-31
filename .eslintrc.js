module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-service-rule"],
  rules: {
    "service-rule": "error",
  },
  env: {
    node: true,
  },
};
