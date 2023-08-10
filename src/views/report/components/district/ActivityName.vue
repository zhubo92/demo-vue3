<script setup lang="ts">
const props = defineProps<{
  value: string
}>()

const value = ref(props.value)
</script>

<template>
  <div class="activity-name">{{ value }}</div>
</template>

<style scoped></style>
