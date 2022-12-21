<template>
  <div class="p-6">
    <section-title title="svg"></section-title>
    <svg-icon name="list" class="text-orange-400 my-8  bg-opacity-20 text-theme-text-primary"></svg-icon>
    <section-title title="vueUse"></section-title>
    <span class="text-theme-text-placeholder my-8 text-center block max-w-xl line-clamp-1">mouseX: {{ x }}  mouseX: {{ y }}</span>
    <section-title title="按需引入element ui  - 按钮"></section-title>
    <element-ui-theme></element-ui-theme>
    <section-title title="引用静态资源"></section-title>
    <el-image class="w-60"  :src="$globalStaticAssets('images/sun.png')" fit="cover" ></el-image>
    <section-title title="引用全局css变量"></section-title>
    <div class="scss h-20 w-20 m-auto my-6 shadow-el-base"></div>
    <section-title title="引用element api"></section-title>
    <el-button class="m-10" :plain="true" @click="open">success</el-button>
  </div>
</template>
<script setup>
const { x, y } = useMouse();
const open = () => {
  // eslint-disable-next-line
  ElMessage({
    message: 'info',
    type: 'success'
  });
};

</script>
<style lang="scss" scoped>
.scss {
  background: var(--el-color-primary);
}
</style>
