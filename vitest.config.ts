import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 각 패키지를 독립된 프로젝트로 실행 (프로젝트 이름 = package.json의 name)
    projects: ['game', 'libs/*'],
    passWithNoTests: true,
  },
});
