import { createApp } from 'vue';
import App from './App.vue';
// 注册全局变量
import * as globalVariables from '@/utils/global.js';

/* 导入工程css */
import '@/styles/index.scss';

/* 导入svg使用 */
import 'virtual:svg-icons-register';
import svgIcon from '@/icons/svg-icon.vue';

export const app = createApp(App);


// eslint-disable-next-line guard-for-in
for (const key in globalVariables) {
  app.config.globalProperties[`$${key}`] = globalVariables[key];
}

app.component('svg-icon', svgIcon);

app.mount('#app');
