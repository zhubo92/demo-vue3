<script setup lang="ts">
const props = defineProps(['value'])
const value = ref(props.value)
</script>

<template>
  <div class="user-info ui">
    <img src="" alt="" class="ui-logo" />
    <div class="ui-shadow"></div>
    <div class="ui-info">
      <img src="" alt="" class="ui-info-ava" />
      <div class="ui-info-content">
        <div class="name">{{ value }}</div>
        <div class="class">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
