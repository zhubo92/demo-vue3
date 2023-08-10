<script setup lang="ts">
const props = defineProps(['value'])
const value = reactive(props.value)
</script>

<template>
  <div class="domain-ability da">
    <div class="da-name">{{ value }}</div>
    <div class="da-title">幼儿行为表现</div>
    <div class="da-behave">{{ value }}</div>
    <div class="da-story">{{ value }}</div>
    <div class="da-level">{{ value }}</div>
    <div class="da-gs growth-story">{{ value }}</div>
    <div class="da-bottom"></div>
  </div>
</template>

<style scoped></style>
