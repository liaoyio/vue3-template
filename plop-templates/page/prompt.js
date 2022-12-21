import { dirExsit, notEmpty } from '../utils.js';
/*
*  parent dir + vue组件
*  css全部统一提出去放在css文件夹
*  自动的生成异步路由到plop.js
* */
export default {
  description: 'generate a page',
  prompts: [{
    type: 'input',
    name: 'path',
    message: 'parent  path [src/pages/]',
    validate: dirExsit
  }, {
    type: 'input',
    name: 'name',
    message: 'page name please',
    validate: notEmpty
  },
  {
    type: 'checkbox',
    name: 'blocks',
    message: 'Blocks:',
    choices: [{
      name: '<template>',
      value: 'template',
      checked: true
    },
    {
      name: '<script>',
      value: 'script',
      checked: true
    },
    {
      name: 'style',
      value: 'style',
      checked: true
    }],
    validate(value) {
      console.log(value);
      if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
        return 'View require at least a <script> or <template> tag.';
      }
      return true;
    }
  }
  ],
  // data中含有所有变量
  actions: (data) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    [
      '添加vue组件',
      {
        type: 'add',
        path: data.path ? 'src/pages/{{path}}/{{name}}/index.vue' : 'src/pages/{{name}}/index.vue',
        templateFile: 'plop-templates/page/index.hbs',
        data: {
          template: data.blocks.includes('template'),
          script: data.blocks.includes('script'),
          style: data.blocks.includes('style')
        }
      },
      '修改路由',
      {
        type: 'modify',
        path: 'src/router/plop.js',
        pattern: /(\/\/ INSERT ROUTER)/gi,
        templateFile: 'plop-templates/page/router.hbs'
      }
    ]

};
