import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import svgr from 'vite-plugin-svgr'

const __dirname = import.meta.dirname;

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const isProd = mode === 'production'

  return {
    base: isProd ? '/todo-react/' : '/',
    server: {
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@widgets': path.resolve(__dirname, './src/widgets'),
        '@features': path.resolve(__dirname, './src/features'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@components': path.resolve(__dirname, './src/shared/components'),
        '@assets': path.resolve(__dirname, './src/shared/assets'),
        '@styles': path.resolve(__dirname, './src/shared/styles'),
      }
    },
    plugins: [react(), svgr()],
  }
})
