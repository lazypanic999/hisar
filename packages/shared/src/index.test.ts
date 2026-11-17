import { describe, expect, it } from 'vitest';
import { PROJECT_NAME } from './index';

describe('shared', () => {
  it('proje adını dışa açar', () => {
    expect(PROJECT_NAME).toBe('hisar');
  });
});
