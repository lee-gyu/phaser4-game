import { defineConfig } from 'vite';

export default defineConfig({
  // 정적 호스팅 어디에 올려도 동작하도록 상대 경로로 빌드
  base: './',
  resolve: {
    // libs/* 가 각자 phaser를 참조해도 런타임에는 하나의 인스턴스만 쓰도록 보장
    dedupe: ['phaser'],
  },
  build: {
    // phaser는 단독으로 ~1.2MB라 경고 기준을 올리고, 별도 청크로 분리해 캐시 효율을 높인다
    chunkSizeWarningLimit: 1500,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'phaser', test: /[\\/]node_modules[\\/]phaser[\\/]/ }],
        },
      },
    },
  },
});
