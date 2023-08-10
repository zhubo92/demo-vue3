<script setup lang="ts">
const props = defineProps(['value'])
const value = ref(props.value)
</script>

<template>
  <div class="district-name">{{ value }}</div>
</template>

<style scoped></style>
