import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/.wrangler/**',
    'playwright-report/**',
    'test-results/**',
  ]),
  js.configs.recommended,
  tseslint.configs.strict,
  {
    languageOptions: { globals: { ...globals.node } },
  },
  {
    // packages/engine saf kalır: ağ, dosya, saat ve Math.random yok (CLAUDE.md).
    files: ['packages/engine/**/*.ts'],
    languageOptions: { globals: {} },
    rules: {
      'no-restricted-properties': [
        'error',
        { object: 'Math', property: 'random', message: 'Motor deterministik: tohumlu RNG kullan.' },
        { object: 'Date', property: 'now', message: 'Motor saf: tarihi parametre olarak al.' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "NewExpression[callee.name='Date'][arguments.length=0]",
          message: 'Motor saf: argümansız new Date() kullanılamaz.',
        },
      ],
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'Motor ağa çıkmaz.' },
        { name: 'XMLHttpRequest', message: 'Motor ağa çıkmaz.' },
        { name: 'WebSocket', message: 'Motor ağa çıkmaz.' },
        { name: 'localStorage', message: 'Motor depolamaya erişmez.' },
        { name: 'sessionStorage', message: 'Motor depolamaya erişmez.' },
        { name: 'process', message: 'Motor ortamdan bağımsızdır.' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['node:*', 'fs', 'fs/*', 'path', 'os', 'http', 'https', 'child_process'],
              message: 'Motor bağımlılıksız ve saf kalır.',
            },
          ],
        },
      ],
    },
  },
  prettier,
);
