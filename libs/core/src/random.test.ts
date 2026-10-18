import { describe, expect, it } from 'vitest';
import { createRng } from './random';

describe('createRng', () => {
  it('같은 시드는 같은 수열을 만든다', () => {
    const a = createRng(42);
    const b = createRng(42);
    const seqA = Array.from({ length: 5 }, () => a.next());
    const seqB = Array.from({ length: 5 }, () => b.next());
    expect(seqA).toEqual(seqB);
  });

  it('next()는 [0, 1) 범위를 벗어나지 않는다', () => {
    const rng = createRng(1);
    for (let i = 0; i < 1000; i++) {
      const n = rng.next();
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(1);
    }
  });

  it('int()는 양 끝을 포함한다', () => {
    const rng = createRng(7);
    const seen = new Set<number>();
    for (let i = 0; i < 500; i++) seen.add(rng.int(1, 3));
    expect([...seen].sort()).toEqual([1, 2, 3]);
  });

  it('pick()은 빈 배열에서 에러를 던진다', () => {
    expect(() => createRng(0).pick([])).toThrow(RangeError);
  });
});
