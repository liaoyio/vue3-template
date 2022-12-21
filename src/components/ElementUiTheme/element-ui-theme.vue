<template>
  <div class="element-ui-theme"  v-loading="loading">
    <el-button class="my-6 mx-auto block" type="primary" @click="changeTheme">切换主题</el-button>

    <el-row class="m-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
    </el-row>

    <el-row class="m-4">
      <el-button disabled>Default</el-button>
      <el-button type="primary" disabled>Primary</el-button>
      <el-button type="danger" disabled>Success</el-button>
    </el-row>

    <el-row class="m-4">
      <el-button disabled link>Default</el-button>
      <el-button type="primary" disabled link >Primary</el-button>
      <el-button type="danger" disabled link >Success</el-button>
    </el-row>

    <el-row class="m-4">
      <el-link type="primary" class="m-2">primary</el-link>
      <el-link type="success" class="m-2">success</el-link>
      <el-link type="primary" disabled class="m-2">primary</el-link>
    </el-row>

    <el-row class="m-4">
      <el-autocomplete
          v-model="state1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
      />
    </el-row>

    <el-row class="m-4">
      <el-cascader v-model="value" :options="options"  />
    </el-row>

    <el-row class="m-4">
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-checkbox v-model="checked2" label="Option 2" size="large" />
      <el-checkbox v-model="checked1" label="Option 1" size="large" disabled />
    </el-row>

    <el-row class="m-4">
      <el-color-picker v-model="color1" />
    </el-row>

    <el-row class="m-4">
      <el-date-picker
          v-model="value1"
          type="date"
          placeholder="Pick a day"
      />
    </el-row>

    <el-row class="m-4">
      <el-radio-group v-model="f" class="ml-4">
        <el-radio label="1" size="large">Option 1</el-radio>
        <el-radio label="2" size="large">Option 2</el-radio>
        <el-radio label="1" size="large" disabled>Option 1</el-radio>
      </el-radio-group>
    </el-row>

    <el-row class="m-4">
      <el-badge :value="1" class="item" type="primary">
        <el-button>comments</el-button>
      </el-badge>
      <el-switch  class="mx-2.5" v-model="value1" />
      <el-select class="mx-6" v-model="f" clearable placeholder="Select">
        <el-option
            v-for="item in 6"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>
      <el-pagination class="mx-2" layout="prev, pager, next" :total="50" />
    </el-row>

    <el-row class="m-4">
      <el-input v-model="f" placeholder="Please input" disabled class="my-5"/>
      <el-input v-model="f" placeholder="Please input"  class="my-5"/>
    </el-row>

    <el-row class="m-4">
      <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          list-type="picture-card"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt=""/>
        <el-icon   class="avatar-uploader-icon"></el-icon>
      </el-upload>
    </el-row>

  </div>
</template>
<script setup >
const imageUrl = ref('');

const value1 = ref('');

const color1 = ref('#409EFF');

const checked1 = ref(true);
const checked2 = ref(false);

const value = ref([]);
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  }
];

let flg = true;

const loading = ref(false);
const f = ref('1');

const changeTheme = () => {
  loading.value = true;
  if (flg) {
    document.body.className = 'dark';
    console.log('output=>', document.body.className);
  } else {
    document.body.className = '';
  }
  flg = !flg;
  setTimeout(() => {
    loading.value = false;
  }, 800);
};

const state1 = ref('');

const querySearch = (queryString, cb) => {
  cb([
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
  ]);
};

</script>

<style scoped>
</style>
