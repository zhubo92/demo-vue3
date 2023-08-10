<script setup lang="ts">
import { getImg } from '@/utils'

const AbilityNameList = [
  {
    id: 0,
    abilityName: '反应程度',
    shortName: '反应',
  },
  {
    id: 1,
    abilityName: '建立程度',
    shortName: '建立',
  },
  {
    id: 2,
    abilityName: '综合程度',
    shortName: '综合',
  },
  {
    id: 3,
    abilityName: '探索程度',
    shortName: '探索',
  },
]
const props = defineProps(['value'])
const value = ref(props.value)
</script>

<template>
  <div class="complex-item">
    <div class="complex-item-header">
      <img :src="value" alt="" />
    </div>
    <div class="complex-item-title">
      <div v-for="ability in AbilityNameList" :key="ability.id">
        {{ ability.shortName }}
      </div>
    </div>
    <div class="complex-item-content">
      <div class="container">
        <div class="container-name">{{ value }}</div>
        <div class="container-degree">
          <div class="container-degree-item">
            <template>
              <img
                v-for="h in 3"
                :key="h"
                :class="['diamond']"
                :src="getImg('diamond')"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
