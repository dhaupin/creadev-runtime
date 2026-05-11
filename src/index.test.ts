import { describe, it, expect } from 'vitest';
import { init, isInitialized } from '../src/index';

describe('Runtime', () => {
  it('isInitialized exists', () => {
    expect(typeof isInitialized).toBe('function');
  });
});
