import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",

      // Prettier
      "prettier/prettier": "warn",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];