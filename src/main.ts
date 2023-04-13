/*
 * @Description: main.ts
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-03-20 15:48:18
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-10 17:51:51
 * @FilePath: \bangbang\src\main.ts
 */
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import App from './App.vue'
import '@/styles/main.scss'
import '@/common/iconfont.css'
export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  return {
    app,
    Pinia
  }
}
