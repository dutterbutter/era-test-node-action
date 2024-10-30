// eslint.config.js
import { error } from "@actions/core";
import prettierPlugin from "eslint-plugin-prettier"; // Import the Prettier plugin

export default [
  {
    files: ["index.cjs"],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Explicitly setting the Node.js environment
        console: "readonly",
        setTimeout: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },
    plugins: {
        prettier: prettierPlugin,
    },
    rules: {
        // ESLint recommended rules (replaces "eslint:recommended")
        "no-unused-vars": "warn",
        "no-extra-semi": "error",
        "no-undef": "error",
        // Prettier-specific rule
        "prettier/prettier": "error",
      },
  },
];
