/*
 * @Description: 
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-03-20 15:48:18
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-11 09:31:20
 * @FilePath: \bangbang\vite.config.ts
 */
// vite.config.ts
import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), AutoImport({
    include: [
      /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /.vue$/,
      /.vue?vue/, // .vue
      /.md$/ // .md
    ],
    dts: 'src/auto-imports.d.ts', // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
    imports: ['vue', 'uni-app', 'pinia'],
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  }),
],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/static/images'),
    },
  },
})