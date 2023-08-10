<script setup lang="ts">
const props = defineProps(['value'])
const value = ref(props.value)
</script>

<template>
  <div class="objectives">{{ value }}</div>
</template>

<style scoped></style>
