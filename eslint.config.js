import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['**/dist/', '**/coverage/']),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        // 각 파일에 가장 가까운 tsconfig.json을 자동으로 찾아 타입 정보를 사용
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['game/**', 'libs/**'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.{js,mjs,ts}', 'scripts/**'],
    languageOptions: { globals: globals.node },
  },
  // 포맷 관련 규칙은 Prettier에 맡긴다 (항상 마지막에 둘 것)
  prettier,
);
