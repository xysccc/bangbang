/*
 * @Description: main.ts
 * @Author: YuShuXiao 949516815@qq.com
 * @Date: 2023-03-20 15:48:18
 * @LastEditors: YuShuXiao 949516815@qq.com
 * @LastEditTime: 2023-04-10 17:51:51
 * @FilePath: \bangbang\src\main.ts
 */
import { createSSRApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(createPinia());
  return {
    app,
  };
}
