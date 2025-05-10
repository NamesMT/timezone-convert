import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [...configDefaults.coverage.exclude!, 'src/cli-entry.ts'],
    },
  },
})
