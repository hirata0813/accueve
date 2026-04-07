import { defineConfig } from 'prisma';

export default defineConfig({
  seed: 'ts-node --esm prisma/seed.ts',
});
