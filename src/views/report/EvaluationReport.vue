<script setup lang="ts">
import CoverPage from '@/views/report/components/cover/CoverPage.vue'
import { getImg } from '@/utils'
import {
  getThoughtValuationReportSemester,
  getThoughtValuationReportSingle,
} from '@/api/report'
import {
  IAbilityLevelDes,
  IComponent,
  IDistrictData,
  IPage,
  IReport,
} from '@/type/report'
import { Swipe, SwipeItem } from 'vant'
import type { SwipeInstance } from 'vant'
import TurnPage from '@/views/report/components/district/TurnPage.vue'

const SubTitle = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/SubTitle.vue'),
  ),
)
const DistrictName = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/DistrictName.vue'),
  ),
)
const SloganComponent = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/SloganComponent.vue'),
  ),
)
const ActivityName = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/ActivityName.vue'),
  ),
)
const ObjectivesComponent = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/ObjectivesComponent.vue'),
  ),
)
const DomainAbility = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/DomainAbility.vue'),
  ),
)
const FamilyEducationStrategy = markRaw(
  defineAsyncComponent(
    () =>
      import('@/views/report/components/district/FamilyEducationStrategy.vue'),
  ),
)
// const ComplexDevelopTitle = markRaw(
//   defineAsyncComponent(
//     () => import('@/views/report/components/complex/ComplexDevelopTitle.vue'),
//   ),
// )
// const ComplexItem = markRaw(
//   defineAsyncComponent(
//     () => import('@/views/report/components/complex/ComplexItem.vue'),
//   ),
// )
// const UserInfo = markRaw(
//   defineAsyncComponent(
//     () => import('@/views/report/components/district/UserInfo.vue'),
//   ),
// )
// const RadarChart = markRaw(
//   defineAsyncComponent(
//     () => import('@/views/report/components/complex/RadarChart.vue'),
//   ),
// )
// const AssessmentSkills = markRaw(
//   defineAsyncComponent(
//     () => import('@/views/report/components/complex/AssessmentSkills.vue'),
//   ),
// )

const defaultReport: IReport = {
  // 是否是单次测评
  isSingle: true,
  // 是否教师端
  isTeacher: true,
  // 是否从接口获取完数据
  isFinish: false,
  babyId: '',
  recordId: '',
  babyInfo: {
    babyName: '',
    className: '',
    headImg: '',
    parentId: '',
    schoolName: '',
    sendNumber: 0,
    valuationType: '',
  },
  districtList: [],
  domainList: [],
  radarMapList: [],
}

const showCover = ref<boolean>(false)
let report = reactive<IReport>(defaultReport)
const pageList = reactive<IPage[]>([])
const currentPage = ref<number>(1)
const swipeRef = ref<SwipeInstance>()

const totalPage = computed(() => {
  return pageList.length
})

const showDown = computed(() => {
  return currentPage.value < totalPage.value
})

const showUp = computed(() => {
  return currentPage.value > 1
})
const init = () => {
  const { babyId, recordId, type: _type } = useRoute().query
  Object.assign(report, {
    babyId,
    recordId,
    isSingle: _type === '1' || _type === '2',
    isTeach: _type === '1' || _type === '3',
  })
}

const getId = () => Math.random().toString(16).substring(2, 10)

const addComponentIfExist = (
  componentList: IComponent[],
  Component: any,
  value: any,
) => {
  if (value) {
    componentList.push({
      id: getId(),
      view: Component,
      value,
    })
  }
}

const createComponent = () => {
  report.districtList.map(district => {
    district.dataList.map(item => {
      const {
        subtitle,
        districtName,
        slogan,
        activityName,
        activityDescription,
        abilityLevelDes,
      } = item as IDistrictData

      const componentList: IComponent[] = []

      addComponentIfExist(componentList, SubTitle, subtitle)
      addComponentIfExist(componentList, DistrictName, districtName)
      addComponentIfExist(componentList, SloganComponent, slogan)
      addComponentIfExist(componentList, ActivityName, activityName)
      addComponentIfExist(
        componentList,
        ObjectivesComponent,
        activityDescription,
      )

      const { behave, education } = abilityLevelDes as IAbilityLevelDes

      const domain = {
        isEmpty: true,
        behave: '',
        growth: '',
      }

      if (behave) {
        domain.behave = behave
        domain.isEmpty = false
      }

      if (!domain.isEmpty) {
        componentList.push({
          id: getId(),
          view: DomainAbility,
          value: domain,
        })
      }

      if (education) {
        componentList.push({
          id: getId(),
          view: FamilyEducationStrategy,
          value: education,
        })
      }

      pageList.push({ id: getId(), componentList })

      console.log(JSON.parse(JSON.stringify(pageList)), 'pageList')
    })
  })
}
const getReport = async () => {
  const request = report.isSingle
    ? getThoughtValuationReportSingle
    : getThoughtValuationReportSemester

  const { data, status } = await request({
    babyId: report.babyId,
    recordId: report.recordId,
  })

  if (status === 200) {
    const updatedReport = { ...report }
    Object.assign(updatedReport, data, { isGet: true })
    report = updatedReport

    console.log(JSON.parse(JSON.stringify(report)), 'report')

    createComponent()
  }
}

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
