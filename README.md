# Vue3 Template

* 基础:   vue3  vite pnpm
* 代码检查 :  eslint(airbnb-base规范)     stylelint
* css开发: postcss  sass   tailwindCss hooks工具:  vuesue
* 插件:
  * unplugin-auto-import  自动导入
  * unplugin-vue-components 自动导入组件
  * vite-plugin-remove-console  生产环境移除console
  * vite-plugin-svg-icons  svg图标使用 
  * vite-plugin-vue-setup-extend  setup语法糖添加组件名字
  * rollup-plugin-visualizer  生产打包可视化报告
* 功能:
  * 区分环境
  * 代码分块



## 使用 pnpm
> [https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)

**pnpm 优势**
1. pnpm依赖包将被存放在一个统一的位置；
2. 支持monorepo 单一仓库, 当前项目只能使用当前项目的包, 不可使用其依赖依赖的包 ;
3. 硬链接 ：安装包时启用硬链接，多个文件夹平等的共享同一个存储单元 (就算删除其中一个,仍可通过其他文件夹访问) 
4.  软链接: 其他文件或目录的引用 
5. mklink  /H  new   source 
6. 跨磁盘会报警告,`cross-device link not permitted`
:::warning
如果包储存的位置与安装位置不在同一个盘，那么包已下载的包将会被复制，而不是被链接，如果你在C盘执行了 `pnpm install `，则pnpm存储必须在C盘，如果pnpm存储在其他盘，所需要的包将会被复制到项目位置而不是链接形式，这样严重扼制了pnpm存储和性能优势。
:::

```powershell
npm install -g pnpm

config get registry

pnpm set registry https://registry.npm.taobao.org 

# https://registry.npmjs.org/
pnpm config set store-dir E:/.pnpm-store# 修改默认仓库地址

pnpm store path  # 获取包仓库地址（pnpm的仓库不能跨磁盘）
pnpm store prune  # 从store中删除当前未被(硬连接)引用的包来释放store的空间
```

与 npm 的差异 
> [参考链接： 功能比较](https://pnpm.io/zh/feature-comparison)。

| npm命令 | pnpm等价命令 |
| --- | --- |
| npm install | pnpm install   安装全部依赖 |
| npm install 包名 | pnpm add  (-D) 包名 |
| npm uninstall 包名 | pnpm remove 包名 |
| npm run 脚本 | pnpm 脚本 |

## vite 功能特性
使用vite 创建一个 vue3项目：
```css
pnpm create vite vue3-template --template vue

cd vue3-template

pnpm install

pnpm run dev
```
> 参考 [vite 官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)


### 依赖构建
:::warning
依赖预构建,全代码抛弃 **require** 
:::
```powershell
/*
依赖预构建  全代码抛弃require 
1. vite将CommonJS或UMD发布的依赖项转换为 ESM 的语法规范 (esbuild实现), 放到node_modules/.vite/deps
2. 路径问题 , 强制 Vite 重新构建依赖，你可以用 --force 命令行选项启动开发服务器
3. 网络多包传输时, Vite 将有许多内部模块的ESM依赖关系转换为单个或几个模块, 只需要一个HTTP请求
4. @type import('vite').UserConfig   类型注释
*/
```
### 环境变量/全局常量
```shell
/*
环境变量/dotenv  		定义常量define
1. mode 通过 --mode 指定
2. 在js中  使用 import.meta.env.VITE_xxx 使用环境变量
3. define: { NUM: JSON.stringify(1) }
*/
```
#### 情景配置
在项目根目录新建 config 文件夹,并新建 build.js 和 dev.js 文件
dev.js
```css
/**
 * @type import('vite').UserConfig
 */
export const devConfig = {
  pl
};

```
build.js
```css
/**
 * @type import('vite').UserConfig
 */
export const buildConfig = {
  
};

```
上面我们在这两个文件头部都写了 @type import('vite').UserConfig , 这是vite提供的类型注释,方便代码提示:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671506192841-60c30c89-de14-45e0-8f71-80377ec72778.png#averageHue=%231f1f1e&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=365&id=ue3d9baa6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=456&originWidth=1227&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46344&status=done&style=none&taskId=ue5c3980a-1f8d-4e47-9394-d05dfeb7a72&title=&width=981.6)
新建 index.js 文件
```css
import { devConfig } from './dev';
import { buildConfig } from './build';

export const envResolver = {
  development: () => {
    console.log('---development---');
    return devConfig;
  },
  production: () => {
    console.log('---production---');
    return buildConfig;
  }
};

```

> 参考链接 [vite 情景配置](https://cn.vitejs.dev/config/#conditional-config)

在 vite.config.js 使用刚刚配置的环境变量
```css
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { envResolver } from './config/index.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) =>
  Object.assign(envResolver[mode](), {
    base: '/',
    server: {},
    build: {},
    plugins: [vue()]
  })
);

```
上面中的 mode 的值就是我们所处的环境,我们可以输出一下看看:
```css
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { envResolver } from './config/index.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('mode', mode);
  return Object.assign(envResolver[mode](), {
    base: '/',
    server: {},
    build: {},
    plugins: [vue()]
  });
});

```

![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671508420154-d3ae1e92-29d5-45b1-a7ad-9fdbbdf8db7e.png#averageHue=%23212120&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=302&id=ueb95e6ed&margin=%5Bobject%20Object%5D&name=image.png&originHeight=378&originWidth=1133&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35298&status=done&style=none&taskId=u67ffc69a-d904-454e-b27d-759f4003055&title=&width=906.4)
#### 配置环境变量
在刚刚创建的config文件夹新建 env 文件夹,并新建 .env.development 和 .env.production 文件
```css
//  .env.development 文件写入
VITE_PROJ_NAME = 'unTitled-dev'

// .env.production 文件写入 
VITE_PROJ_NAME = 'unTitled-prod'
```
环境变量默认是在项目根目录的,为了让其生效,我们要在  vite.config.js 添加 `envDir`配置
```css
import { resolve } from 'path';

envDir: resolve(__dirname,'config/env'),
```
在 main.js 打印一下:
```css
console.log('env_path', import.meta.env);
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671512064833-c6f2c98b-c27d-4074-ba85-fede96cb2445.png#averageHue=%23fefdfd&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=210&id=u6810aba0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=262&originWidth=684&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17495&status=done&style=none&taskId=u1477bedb-c2e9-4d17-a6b0-f2a3efaa9c1&title=&width=547.2)

### 路径别名
在  vite.config.js 配置路径别名
```shell
// 配置路径别名
resolve: {
  alias: {
    '@': resolve(__dirname, 'src')
  }
},
```
在根目录创建jsconfig.json.用@符号代替src的位置
```shell
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "components/*": ["src/components/*"],
      "assets/*": ["src/assets/*"]
    },
    "allowSyntheticDefaultImports": true
  },
  // 注意，你配置的src的别名不能在下面的node_modules以及dist打包文件夹里面使用
  "exclude": ["node_modules", "dist"]
}

```

### SCSS
:::warning
弃用** **::v-deep，使用 **:deep()**
:::

```css
:deep(.el-progress__text) {

}

/*
!default //降低scss变量优先级
!global // 表示就用此值
 map.deep-merge  https://www.sasscss.com/documentation/modules/map
*/

```

### 修改源码无效问题
:::warning
有时候我们修改了vite源代码后,即使是重新运行项目,还是不会出现我们修改后的效果,因为vite默认存在缓存。
:::
解决办法,在 package.json 添加运行命令:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671512498407-70ae6246-cff9-49d8-aeba-0b2e82983bc0.png#averageHue=%23201f1e&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=467&id=uf9c2fbd5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=584&originWidth=863&originalType=binary&ratio=1&rotation=0&showTitle=false&size=58414&status=done&style=none&taskId=ub797ff61-ffbe-4a98-a3ed-73bd707ac6c&title=&width=690.4)
执行:
```shell
# --force  刷新.vite缓存
pnpm run devNoCache
```

## 语法检测
### 集成eslint
安装依赖：
:::info
这里我们使用继承的方式来使用eslint的基本规范(用的比较舒服一点)，然后遵循eslint-plugin-vue和 vite-plugin-eslint中的eslint规范。
:::
```powershell
# 继承 校验import vue   
pnpm  add -D eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue vite-plugin-eslint
```
初始化eslint：
先全局安装一下eslint ` npm i -g eslint`，然后执行：`eslint --init `

使用 vite-plugin-eslint 插件：
```powershell
# vite-plugin-eslint可在控制台打印错误信息 注册插件
import eslint from 'vite-plugin-eslint';
eslint({ cache: false })
```

## 集成 Tailwindcss 和 **postcss**
#### 安装 postcss
```javascript
pnpm add -D autoprefixer  postcss 
```
在根目录新建 `postcss.config.js`  文件：
```javascript
export default {
  plugins: {
    // 'postcss-import': {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
    // 'tailwindcss/nesting': 'postcss-nesting'
    // 'tailwindcss': {},
    'autoprefixer': {}
  }
}

```
测试一下效果, 在index.scss中写入下面css样式 :
```javascript
::placeholder {
  color: red;
}
```
main.js打印一下
```javascript
import style from '@/styles/index.scss';

console.log('style', style);
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671522599802-42ef337e-f543-430b-9c59-869868b64fae.png#averageHue=%23fefdfc&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=209&id=u4d6d1333&margin=%5Bobject%20Object%5D&name=image.png&originHeight=261&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=true&size=8234&status=done&style=none&taskId=u4dfbf710-7f7c-40fb-a176-fce52667936&title=%E6%B5%8B%E8%AF%95%E5%B9%B6%E6%89%93%E5%8D%B0%20%E4%BC%9A%E8%87%AA%E5%8A%A8%E5%8A%A0%E4%B8%8A%E5%89%8D%E7%BC%80&width=532 "测试并打印 会自动加上前缀")
#### 安装 Tailwindcss 

```javascript
pnpm add -D  @tailwindcss/line-clamp  postcss-nesting  tailwindcss postcss-import
```

## Svg组件自动生成和导入
```javascript
// 1. 安装插接件
pnpm add  -D  vite-plugin-svg-icons

// 2. 在vite.config.js 使用
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: false
})

// 3. 在main.js 注册全局组件
import 'virtual:svg-icons-register';
import svgIcon from '@/icons/svg-icon.vue';
app.component('svg-icon', svgIcon);
```

## 自动导入组件
安装依赖

- `vite-plugin-vue-setup-extend`  在 setup 中给组件定义别名 （setup语法加 name）
- `unplugin-auto-import` 自动导入插件
- `unplugin-vue-components` 导入vue组件插件

安装使用：
```javascript
// 1. 安装插件
pnpm add -D unplugin-auto-import  unplugin-vue-components  vite-plugin-vue-setup-extend

// 安装 element-plus 组件库
pnpm add element-plus

// 安装 vueuse 函数库
pnpm add @vueuse/core

# https://www.npmjs.com/package/unplugin-auto-import

// 2. 使用
import Components from 'unplugin-vue-components/vite'
Components({
    // 指定自动导入的组件位置，默认是 src/components
    dirs: ['src/components'],
    resolvers: [
      // 自动导入 Element Plus 组件
      ElementPlusResolver()
    ],
    // 配置文件生成位置，默认是根目录 /components.d.ts
    dts: 'config/type/components.d.ts',
    deep: true
  }),
    
import AutoImport from 'unplugin-auto-import/vite';
AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ['vue', '@vueuse/core'],
    resolvers: [
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox...
      ElementPlusResolver()
    ],
    // 配置文件生成位置，默认是根目录 /auto-imports.d.ts
    dts: 'config/type/auto-imports.d.ts'
  }),
```
但会出现一个问题，不导入 vue，eslint报错，找不到相关 api,这时候我们需要配置eslint生成一个文件：
```javascript
AutoImport({
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    imports: ['vue', '@vueuse/core'],
    eslintrc: {
      // 默认false, true启用。false生成一次就可以，避免每次工程启动都生成
      enabled: true,
      // 不导入ref, reactive vueUse时，vscode会报错, 让eslint生成 json文件
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true
    },
    resolvers: [ ElementPlusResolver() ],
    // 配置文件生成位置，默认是根目录 /auto-imports.d.ts
    dts: 'config/type/auto-imports.d.ts'
  }),
```
在 .eslintrc.cjs 文件里配置继承 .eslintrc-auto-import.json 文件：
```javascript
// .eslintrc.js
extends: [
  'plugin:vue/vue3-essential',
  'airbnb-base',
  // 继承 .eslintrc-auto-import.json 规避找不到 ref vueuse函数
  '.eslintrc-auto-import.json'
],
```

#### 注册全局变量
```javascript
app.config.globalProperties.$version = app.version;
app.config.globalProperties.$stati = (url) => new URL(`../assets/${url}`, import.meta.url).href
```

验证效果：
```javascript
<script setup name="test">

const { x, y } = useMouse();

const open = () => {
  // eslint-disable-next-line
  ElMessage({
    message: 'info',
    type: 'success'
  });
};

const name = ref('Hello 2023!')

const user = reactive({
  name: 'liaoyi',
  age: 22
})

const change = () => {
  user.name = '格罗姆'
}

onMounted(() => {
  setTimeout(() => {
    name.value = 'onMounted Hello 2023!'
  }, 3000)
})
</script>

<template>
  <svg-icon name="404" className="file-box" size="4" />
  <hr>
  <el-button @click="open" > 点击弹出提示框 </el-button>
  <el-button type="primary" @click="change">改变姓名</el-button>
  <hr>

  <div>姓名：{{ user.name }}</div>
  <div>年龄：{{ user.age }}</div>
  <div> {{  name  }}</div>
  <hr>
  <span>useMouse 获取鼠标： {{  x }} -- {{  y }}</span>
  <hr>
  <!-- 引用静态资源 -->
  <img :src="$static('vue.svg')" alt="" />

</template>

<style scoped lang="scss">
.file-box {
  color: blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

```

## 打包时生成报告

```javascript
pnpm add  -D rollup-plugin-visualizer 
```
注册插件：
```javascript

import { visualizer } from 'rollup-plugin-visualizer';

visualizer({
    open: mode === 'production',
    gzipSize: true,
    brotliSize: true,
    filename: resolve(process.cwd(), 'dist/report.html'),
}),
```
运行 `pnpm run build `
![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671534855586-41378709-2e1d-44cc-a08f-b70514cbaba6.png#averageHue=%23c39393&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=700&id=TVZo7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=875&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=76005&status=done&style=none&taskId=ue579f184-4c52-4191-b490-784a0c14f72&title=&width=1536)

## 生产环境删除 console.log()
安装插件： 

```javascript
// 安装插件
pnpm add  -D vite-plugin-remove-console

// 注册插件
// 配置{external: ["src/assets/iconfont/iconfont.js"] } 对某文件 console 不剔除
removeConsole({
  external: ['src/main.js']
}),
```

##  分包打包优化
> 只有打包体积过大的时候，我们才需要做分包打包优化，如果包体积小的话，分包打包反而会影响性能。

我们试着在src/lib文件夹下新建 myUtils1.js 、myUtils2.js、myUtils3.js 文件夹
```javascript
// myUtils1.js 

export const clog1 = () =>{
   onsole.log('output=> test1')
	 console.log('output=> test1')
}

// myUtils2.js 
export const clog2 = () =>{
   onsole.log('output=> test2')
	 console.log('output=> test2')
}

// myUtils3.js 
export const clog3 = () =>{
   onsole.log('output=> test3')
	 console.log('output=> test3')
}
```
此时我们可以在之前配置自动导入插件里添加目录导入这几个月文件：
```javascript
AutoImport({
   // ...
    dirs: ['src/utils'], // 配置自动导入的目录(比如导入一些自己写的插件或者工具)
    eslintrc: {
      // 默认false, true启用。false生成一次就可以，避免每次工程启动都生成
      enabled: true,
      // 不导入ref, reactive vueUse时，vscode会报错, 让eslint生成 json文件
      filepath: './.eslintrc-auto-import.json', // 生成json文件
      globalsPropValue: true
    },
    // ...
  }),
```
在vue文件中 ：我们就可以直接使用这些方法：
```javascript
<script setup >
  clog1()
  clog2()
  clog3()
</script>
```
我们尝试一下把 element-plus 和  刚刚自动导入的myUtils* 文件分包打包 （打包生成单独的js文件:
```javascript

// 分开打包
const splitDependencies = ['element-plus','myUtils'];

// 打包优化
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
      // 这个id就是打包的文件路径
      console.log('id >>>> ', id);
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

```
 ![image.png](https://cdn.nlark.com/yuque/0/2022/png/22455608/1671538390976-7474b0de-ef2c-4fd3-b21b-c3536fa140e9.png#averageHue=%23252627&clientId=u4077f604-9574-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=294&id=u2d222634&margin=%5Bobject%20Object%5D&name=image.png&originHeight=367&originWidth=851&originalType=binary&ratio=1&rotation=0&showTitle=false&size=30633&status=done&style=none&taskId=ua162546b-e6bf-4596-a500-9784ec827ac&title=&width=680.8)

## 其他依赖
```javascript
# 给setup语法加 name
pnpm add  -D  vite-plugin-vue-setup-extend

# 清除console
pnpm add  -D vite-plugin-remove-console

# 打包显示进度条 https://blog.csdn.net/gongjin2012/article/details/125333102
pnpm add -D vite-plugin-progress  

# 打包报告
pnpm add  -D rollup-plugin-visualizer 

# gzip压缩
pnpm add  -D  vite-plugin-compression

#兼容IE
pnpm add  -D @vitejs/plugin-legacy
// import legacy from '@vitejs/plugin-legacy';
// legacy({
//   targets: ['ie >= 11'],
//   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
// })
# hooks api
pnpm add  @vueuse/core

# VueI18n
pnpm add vue-i18n  #必须安装 前置依赖  
pnpm add  -D  @intlify/vite-plugin-vue-i18n
// 默认仅支持 组合式api
VueI18n({  include: [resolve(__dirname, '../locales/**')],})
// use
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
// 使用  locale可改变其值与文件名相等
const { locale, t } = useI18n();


# mock  数据
pnpm add  -D  vite-plugin-mock

#swiper  https://www.swiper.com.cn
pnpm add swiper  # :watchOverflow="false"单页面生效

# 全屏混动
pnpm add  vue-fullpage.js

# 美化基本html
pnpm add  animate.css   hover.css   normalize.css


cnpm install  --save  axios@0.18.1  #请求发送
cnpm install  --save  vue-router@3.0.6 #路由

cnpm install --save-dev plop@2.3.0  #代码生成
cnpm install  --save nprogress@0.2.0 #进度条
cnpm install  --save  path-to-regexp@2.4.0 # 匹配路由路径表达式工
cnpm install --save video.js
cnpm install  --save js-cookie

cnpm install file-saver --save #文件保存
cnpm install --save jszip  #压缩
cnpm install --save xlsx #excel
```