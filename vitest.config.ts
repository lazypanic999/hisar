import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/*', 'apps/*'],
    // Faz 0'da apps/* henüz test içermiyor; kendi testleri gelince kaldırılacak.
    passWithNoTests: true,
  },
});
