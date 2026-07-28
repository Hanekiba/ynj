import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目站点需要 base = '/<仓库名>/'。
// 通过 BASE_PATH 环境变量注入：本地 dev / preview 不设置时回退为 '/'(站点根)，不受影响。
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
});
