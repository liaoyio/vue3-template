<template>
  <div class="section-title w-full text-center text-el-size-h2 font-bold bg-theme-fill-darker py-3">
    {{props.title}}
  </div>
</template>
<script setup >
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>
</style>
