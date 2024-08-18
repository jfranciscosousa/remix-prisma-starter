import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import lodash from "eslint-plugin-lodash";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/.cache",
      "**/build",
      "public/build",
      "app/styles",
      "**/dist/",
      "**/node_modules",
      "**/api/",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "prettier",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "@remix-run/eslint-config/node",
    ),
  ),
  {
    plugins: {
      prettier: fixupPluginRules(prettier),
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "jsx-a11y": fixupPluginRules(jsxA11Y),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      lodash,
    },

    languageOptions: {
      globals: {
        module: true,
        require: true,
        process: true,
        exports: true,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: "detect",
      },

      formComponents: ["Form"],

      linkComponents: [
        {
          name: "Link",
          linkAttribute: "to",
        },
        {
          name: "NavLink",
          linkAttribute: "to",
        },
      ],
    },

    rules: {
      "lodash/import-scope": [2, "method"],
      "prettier/prettier": "error",
      "import/no-unresolved": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link", "NavLink"],
          specialLink: ["to"],
        },
      ],

      "react/boolean-prop-naming": "error",
      "react/react-in-jsx-scope": "off",
      "react/button-has-type": "error",
      "react/prop-types": "off",
      "react/jsx-no-target-blank": [
        "error",
        {
          warnOnSpreadAttributes: true,
          links: true,
          forms: true,
        },
      ],
    },
  },
];
