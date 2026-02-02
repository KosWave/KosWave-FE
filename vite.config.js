import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // 절대경로로 접근하기
      { find: "~/components", replacement: "/src/components" },
      { find: "~/images", replacement: "/assets/images" },
      { find: "~/apis", replacement: "/src/lib/apis" },
      { find: "~/utils", replacement: "/src/lib/utils" },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }

})
