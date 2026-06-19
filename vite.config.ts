import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@tncb/data': resolve(__dirname, 'src/data'),
      '@tncb/core': resolve(__dirname, 'src/core'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/tests/**/*.test.ts'],
  },
})
