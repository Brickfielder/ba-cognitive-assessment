import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const configuredBase = process.env.VITE_BASE_PATH ?? '/'
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['e2e/**', 'playwright.config.ts'],
  },
})
