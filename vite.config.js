import { defineConfig } from 'vite';
import { resolve } from 'path';
import { envResolver } from './config/index.js';
import { getPlugins } from './config/plugins';

// 分开打包
const splitDependencies = ['element-plus', 'myUtils'];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    base: '/',
    server: {
      // 是否开启 https
      // https: false,
      // 端口号
      // port: 80,
      // 监听所有地址 127.0.0.1  localhost   192.168.1.x
      // host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {}
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kb为单位）
      chunkSizeWarningLimit: 2048,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      rollupOptions: {
        // 输出文件命名
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            // 创建一个vendor包含所有依赖项的块node_modules
            for (const dependency of splitDependencies) {
              if (id.includes(dependency)) {
                console.log('output=> id', id);
                return dependency;
              }
            }
          }
        }
      }
    },
    envDir: resolve(__dirname, 'config/env'),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: getPlugins(mode)
  };
  return Object.assign(envResolver[mode](), config);
});
