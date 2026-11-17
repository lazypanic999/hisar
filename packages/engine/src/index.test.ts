import { describe, expect, it } from 'vitest';
import { ENGINE_ID } from './index';

describe('engine', () => {
  it('shared paketini workspace üzerinden içe aktarır', () => {
    expect(ENGINE_ID).toBe('hisar-engine');
  });
});
