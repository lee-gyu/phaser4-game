import { describe, expect, it } from 'vitest';
import { clamp, lerp } from './math';

describe('clamp', () => {
  it('범위 안의 값은 그대로 반환한다', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('범위를 벗어나면 경계값으로 자른다', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });
});

describe('lerp', () => {
  it('t에 따라 선형 보간한다', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(0, 100, 1)).toBe(100);
  });
});
