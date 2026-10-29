import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5277,
    strictPort: true,
    // 后端在 5280；前端只认 /api，不关心它在哪
    proxy: { '/api': 'http://127.0.0.1:5280' },
    /* ★ 下面四个目录是**运行时数据**，不是前端源码：
         corpus/    后端每次保存提示词都会重写 index.json 与 template.vN.md
         output/    agent 的产物目录
         server/data/
         _to_delete/
       若不忽略，保存提示词会触发 Vite 整页重载 —— 页面被刷掉，
       「已保存 · 第 N 版」的回执还没显示就没了，看上去就像「保存没反应」。
       实测（tools/probe-hmr2.mjs）：写 corpus/prompts/index.json → navigate +1；
       写 output/** → +0；写 src/** → 走 HMR +0。 */
    watch: {
      ignored: ['**/corpus/**', '**/output/**', '**/server/data/**', '**/_to_delete/**'],
    },
  },
})
