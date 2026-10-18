// 새 라이브러리 패키지를 libs/<name> 에 생성한다.
// 사용법: pnpm create:lib <name> [--phaser]

import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parseArgs } from 'node:util';

const USAGE = 'Usage: pnpm create:lib <name> [--phaser]';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    phaser: { type: 'boolean', default: false },
  },
});

const name = positionals[0];
if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error(`${USAGE}\n  <name>은 kebab-case 여야 합니다 (예: audio, save-system)`);
  process.exit(1);
}

const rootDir = join(import.meta.dirname, '..');
const libDir = join(rootDir, 'libs', name);
const pkgName = `@libs/${name}`;

if (existsSync(libDir)) {
  console.error(`이미 존재합니다: ${relative(rootDir, libDir)}`);
  process.exit(1);
}

const pkg: Record<string, unknown> = {
  name: pkgName,
  version: '0.0.0',
  private: true,
  type: 'module',
  sideEffects: false,
  exports: { '.': './src/index.ts' },
  scripts: {
    typecheck: 'tsc --noEmit',
    test: 'vitest run --passWithNoTests',
  },
};

if (values.phaser) {
  // 게임과 같은 phaser 버전 범위를 사용해 인스턴스가 하나로 유지되도록 한다
  const gamePkg = JSON.parse(readFileSync(join(rootDir, 'game/package.json'), 'utf8')) as {
    dependencies: { phaser: string };
  };
  const phaserRange = gamePkg.dependencies.phaser;
  pkg.peerDependencies = { phaser: phaserRange };
  pkg.devDependencies = { phaser: phaserRange };
}

const tsconfig = {
  extends: '../../tsconfig.base.json',
  include: ['src'],
};

const indexTs = `// ${pkgName} 의 공개 API를 여기서 export 합니다.
export {};
`;

await mkdir(join(libDir, 'src'), { recursive: true });
await Promise.all([
  writeFile(join(libDir, 'package.json'), `${JSON.stringify(pkg, null, 2)}\n`),
  writeFile(join(libDir, 'tsconfig.json'), `${JSON.stringify(tsconfig, null, 2)}\n`),
  writeFile(join(libDir, 'src/index.ts'), indexTs),
]);

console.log(`✔ ${relative(rootDir, libDir)} (${pkgName}) 생성 완료

다음 단계:
  pnpm install                                   # 워크스페이스에 등록
  pnpm --filter game add ${pkgName}@workspace:*  # 게임에서 사용하려면
`);
