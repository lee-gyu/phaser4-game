export interface Rng {
  /** [0, 1) 범위의 실수 */
  next(): number;
  /** [min, max] 범위의 정수 (양 끝 포함) */
  int(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
}

/** 시드 기반 난수 생성기 (mulberry32). 같은 시드면 항상 같은 수열을 만든다. */
export function createRng(seed: number): Rng {
  let state = seed >>> 0;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    pick: (items) => {
      if (items.length === 0) throw new RangeError('pick() requires a non-empty array');
      return items[Math.floor(next() * items.length)]!;
    },
  };
}
