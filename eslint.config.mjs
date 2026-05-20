import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: ['dist', '.astro', 'node_modules', '**/*.md', '**/*.mdx'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    rules: {
      // Prefer running Prettier via `npm run format` instead of lint-time parsing.
      reportUnusedDisableDirectives: 0,
    },
  },
  {
    files: ['public/**/*.js', 'src/pages/games/**/*.js'],
    languageOptions: {
      globals: globals.browser,
    },
  },
];
