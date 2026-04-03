import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig(() => {
  // Storybook's Vite builder reuses this Vite config. We only want
  // declaration bundling (`vite-plugin-dts`) when we explicitly build the library.
  const shouldBuildTypes = process.env.CRAFTUI_BUILD_LIBRARY === 'true'

  return {
    plugins: [
      react(),
      ...(shouldBuildTypes
        ? [
            dts({
              include: ['src/**/*.{ts,tsx}'],
              exclude: ['src/**/*.stories.tsx', 'src/**/*.test.{ts,tsx}'],
              rollupTypes: true,
            }),
          ]
        : []),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CraftUI',
        formats: ['es', 'cjs'],
        fileName: 'craft-ui',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          assetFileNames: 'craft-ui.[ext]',
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/node_modules/**',
          '**/.storybook/**',
          'src/**/*.stories.{ts,tsx}',
          'src/**/*.test.{ts,tsx}',
          'src/test/**',
          'src/vite-env.d.ts',
        ],
      },
    },
  }
})
