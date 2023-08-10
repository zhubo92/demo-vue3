<script setup lang="ts">
import { getImg } from '@/utils'
import type { SwipeInstance } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import CoverPage from '@/views/report/components/cover/CoverPage.vue'
import TurnPage from '@/views/report/components/district/TurnPage.vue'
import { useReportStore } from '@/store/modules/report'
import { storeToRefs } from 'pinia'

const showCover = ref<boolean>(false)
const currentPage = ref<number>(1)
const swipeRef = ref<SwipeInstance>()

const store = useReportStore()
const { pageList, totalPage } = storeToRefs(store)
const { init, getReport } = store
// const report = computed(() => store.report)
// const pageList = computed(() => store.pageList)
// const totalPage = computed(() => store.totalPage)

const showDown = computed(() => currentPage.value < totalPage.value)
const showUp = computed(() => currentPage.value > 1)

const changeSwipe = (direction: string) => {
  if (direction === 'bottom') {
    swipeRef.value?.next()
    currentPage.value++
  } else {
    swipeRef.value?.prev()
    currentPage.value--
  }
}

init()
getReport()

/**
 * 封面页：CoverPage
 * 报告页：{
 *   综合发展情况：{
 *      标题：ComplexDevelopTitle
 *      雷达图：RadarChart
 *      评估技能：AssessmentSkills
 *   }
 *   报告：{
 *      孩子信息：UserInfo
 *      副标题：SubTitle
 *      区域名：DistrictName
 *      口号：SloganComponent
 *      活动名称：ActivityName
 *      活动目的：ObjectivesComponent
 *      领域能力：DomainAbility
 *      高阶问题情境卡：QuestionCard
 *      家园共育策略：FamilyEducationStrategy
 *   }
 *   综合发展评估：{
 *     标题：ComplexDevelopTitle
 *     领域：ComplexItem
 *   }
 * }
 */
</script>

<template>
  <CoverPage v-if="showCover" />
  <div
    v-else
    :style="{ backgroundImage: `url(${getImg('reportBGI')})` }"
    class="report"
  >
    <Swipe ref="swipeRef" vertical class="sp" :loop="false" :touchable="false">
      <SwipeItem v-for="page in pageList" :key="page.id" class="sp-item">
        <div class="report-item">
          <Component
            :is="cpt.view"
            v-for="cpt in page.componentList"
            :key="cpt.id"
            :value="cpt.value"
          />
        </div>
      </SwipeItem>
      <template v-if="totalPage > 0" #indicator>
        <div class="sp-indicator">{{ currentPage }}/{{ totalPage }}</div>
      </template>
    </Swipe>

    <TurnPage :show-down="showDown" :show-up="showUp" @turn="changeSwipe" />
  </div>
</template>

<style lang="scss" scoped>
.report {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  box-sizing: border-box;
}

.sp {
  width: 100vw;
  height: 100vh;

  &-item {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }

  &-indicator {
    position: fixed;
    right: 17px;
    bottom: 10px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
