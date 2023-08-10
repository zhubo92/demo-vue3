<script setup lang="ts">
import LoadingComponent from '@/views/demo/LoadingComponent.vue'
import ErrorComponent from '@/views/demo/ErrorComponent.vue'

const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => {
    return Promise.resolve(import('./loaderComponent.vue'))
  },

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 4000,
})
</script>

<template>
  <div class="test">
    <!--<Suspense>-->
    <AsyncComp />
    <!--</Suspense>-->
  </div>
</template>

<style scoped></style>
