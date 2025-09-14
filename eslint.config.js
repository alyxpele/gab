import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    // reactHooks.configs['flat/recommended'],
    {
        plugins: { 'react-hooks': reactHooks },
        rules: { ...reactHooks.configs.recommended.rules },
    },
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: false,
        jsx: true,
        commaDangle: 'always-multiline',
        arrowParens: true,
        blockSpacing: true,
        braceStyle: '1tbs',
        quoteProps: 'as-needed',
    }),
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            '@stylistic/max-len': ['error', {
                code: 120,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreStrings: true,
            }],
            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'comma',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false,
                },
                multilineDetection: 'brackets',
            }],
            '@stylistic/multiline-ternary': ['error', 'never'],
            '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        },
    },
])
