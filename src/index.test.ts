import { describe, it, expect } from 'vitest';
import { init, think, act, getState } from '../src/index';

describe('init', () => {
  it('initializes runtime', async () => {
    const result = await init();
    expect(result).toBeDefined();
  });
});

describe('think', () => {
  it('is function', () => { expect(typeof think).toBe('function'); });
});

describe('act', () => {
  it('is function', () => { expect(typeof act).toBe('function'); });
});
