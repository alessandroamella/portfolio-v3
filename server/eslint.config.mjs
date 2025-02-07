import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        ignores: ["**/build/**"],
        languageOptions: {
            globals: globals.node,
        },
    },
    ...tseslint.configs.recommended,
    pluginJs.configs.recommended,
    eslintConfigPrettier,
];
