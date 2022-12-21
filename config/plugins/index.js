import { resolve } from 'path';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import setupExtend from 'vite-plugin-vue-setup-extend';
import components from 'unplugin-vue-components/vite';
import autoImport from 'unplugin-auto-import/vite';
import removeConsole from 'vite-plugin-remove-console';
import { visualizer } from 'rollup-plugin-visualizer';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export const getPlugins = (mode) => [
  vue(),
  eslint({ cache: false }),
  stylelint(),
  // setup语法糖设置名字
  setupExtend(),
  // 生产环境移除 console   配置{external: ["src/assets/iconfont/iconfont.js"] } 对某文件 console 不剔除
  removeConsole({
    external: ['src/main.js']
  }),
  components({
    dirs: ['src/components/'], dts: 'types/components.d.ts', resolvers: [ElementPlusResolver()], deep: true
  }),
  autoImport({
    // 'pinia', 'vue-router', 'vue-i18n', 'vue', '@vueuse/core'
    imports: ['vue', '@vueuse/core'],
    // dirs: ['src/utils'], // 配置自动导入的目录
    dts: 'types/auto-import.d.ts',
    eslintrc: {
      // 默认false, true启用。false生成一次就可以，避免每次工程启动都生成
      enabled: true,
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true,
    },
    resolvers: [ElementPlusResolver()],
  }),
  createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: false
  }),
  // 生产报告 放在最后一个
  visualizer({
    open: mode === 'production',
    gzipSize: true,
    brotliSize: true,
    filename: resolve(process.cwd(), 'dist/report.html'),
  }),
];
