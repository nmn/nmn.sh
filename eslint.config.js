const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");
const stylex = require("@stylexjs/eslint-plugin");
const reactCompiler = require("eslint-plugin-react-compiler");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  {
    ignores: ["eslint.config.js"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      "@stylexjs": stylex,
      "react-compiler": reactCompiler,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@stylexjs/valid-styles": "error",
      "@stylexjs/sort-keys": "warn",
      "@stylexjs/valid-shorthands": "off",
      "react-hooks/error-boundaries": "off",
      "react-compiler/react-compiler": "error",
    },
  },
];
