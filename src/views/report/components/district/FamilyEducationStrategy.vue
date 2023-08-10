<script setup lang="ts">
const props = defineProps(['value'])
const value = ref(props.value)
</script>

<template>
  <div class="family-education-strategy fes">
    <div class="fes-title">
      <img src="" alt="" class="fes-title-logo" />
      <div class="fes-title-content">
        <div class="name">{{ value }}</div>
        <div class="eName">{{ value }}</div>
      </div>
    </div>
    <div class="fes-content">{{ value }}</div>
  </div>
</template>

<style scoped></style>
