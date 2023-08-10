import { defineStore } from 'pinia'
import { IAbilityLevelDes, IDistrictData, IReport, ReportInterface } from '@/type/report'
import { getThoughtValuationReportSemester, getThoughtValuationReportSingle } from '@/api/report'

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
const QuestionCard = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/QuestionCard.vue'),
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
export const useReportStore = defineStore({
  id: 'report',
  state: (): ReportInterface => {
    return {
      report: defaultReport,
      safeHeight: 800,
      pageHeight: 0,
      pageList: [],
      componentList: [],
    }
  },
  getters: {
    totalPage: state => {
      return state.pageList.length
    },
  },
  actions: {
    getId() {
      return Math.random().toString(16).substring(2, 10)
    },
    getComponentHeight(component: any, value: any) {
      // console.log(value, 'getComponentHeight.value')
      switch (component) {
        case SubTitle:
          return 32
        case DistrictName:
          return 43
        case SloganComponent:
          return 30
        case ActivityName:
          return 60
        case ObjectivesComponent:
          return 250
        case DomainAbility:
          return 415
        case QuestionCard:
          return 500
        case FamilyEducationStrategy:
          return 500
        default:
          return 0
      }
    },
    formatDomainAbilityName(name: string) {
      if (name) {
        let str = ''
        if (name.endsWith('能力')) {
          str = name.replace(/能力/, '”能力')
          str = '“' + str
        } else {
          str = name
        }
        return str
      }
      return ''
    },
    createDomain(item: IDistrictData) {
      const {
        abilityLevelDes,
        domainName,
        domainAbilityName,
        abilityName,
        abilityLevelName,
      } = item as IDistrictData

      if (!item.story) {
        item.story = {
          content: null,
          description: null,
          images: null,
          questions: null,
          videos: null,
        }
      }

      const { content, videos, images } = item.story
      const { behave } = abilityLevelDes

      interface Domain {
        isEmpty: boolean;
        behave: null | string;
        domainName: null | string;
        domainAbilityName: null | string;
        content: null | string;
        abilityName: null | string;
        abilityLevelName: null | string;
        videos: null | string[];
        images: null | string[];
      }

      const domain: Domain = {
        isEmpty: true,
        behave: null,
        domainName: null,
        domainAbilityName: null,
        content: null,
        abilityName: null,
        abilityLevelName: null,
        videos: null,
        images: null,
      }

      if (domainName) {
        domain.domainName = domainName
        domain.isEmpty = false
      }

      if (domainAbilityName) {
        domain.domainAbilityName = this.formatDomainAbilityName(domainAbilityName)
        domain.isEmpty = false
      }

      if (behave) {
        domain.behave = behave
        domain.isEmpty = false
      }

      if (content) {
        domain.content = content
        domain.isEmpty = false
      }

      if (abilityName) {
        domain.abilityName = abilityName
        domain.isEmpty = false
      }

      if (abilityLevelName) {
        domain.abilityLevelName = abilityLevelName
        domain.isEmpty = false
      }

      if (videos) {
        domain.videos = videos
        domain.isEmpty = false
      }

      if (images) {
        domain.images = images
        domain.isEmpty = false
      }

      if (!domain.isEmpty) {
        this.addComponentIfExist(DomainAbility, domain)
        // console.log(domain, 'domain')
      }
    },
    createQuestion(
      item: IDistrictData,
    ) {
      const { questionCardUrl, questionCardUrlList } = item
      if (!item.question) {
        item.question = {
          content: null,
          description: null,
          images: null,
          questions: null,
          videos: null,
        }
      }
      const { content, images, videos } = item.question

      interface Question {
        isEmpty: boolean;
        questionCardUrl: null | string;
        questionCardUrlList: null | string[];
        content: null | string;
        images: null | string[];
        videos: null | string[];
      }

      const question: Question = {
        isEmpty: true,
        questionCardUrl: null,
        questionCardUrlList: null,
        content: null,
        images: null,
        videos: null,
      }
      if (questionCardUrl) {
        question.questionCardUrl = questionCardUrl
        question.isEmpty = false
      }

      if (questionCardUrlList) {
        question.questionCardUrlList = questionCardUrlList
        question.isEmpty = false
      }
      if (content) {
        question.content = content
        question.isEmpty = false
      }

      if (images) {
        question.images = images
        question.isEmpty = false
      }
      if (videos) {
        question.videos = videos
        question.isEmpty = false
      }

      if (!question.isEmpty) {
        this.addComponentIfExist(QuestionCard, question)
        // console.log(question, 'question')
      }
    },
    addComponentIfExist(component: any, value: any) {
      if (value) {
        if (this.pageHeight > this.safeHeight) {
          this.pageHeight = 0
          this.pageList.push({ id: this.getId(), componentList: this.componentList })
          this.componentList = []
        }
        this.pageHeight += this.getComponentHeight(component, value)
        this.componentList.push({
          id: this.getId(),
          view: component,
          value,
        })
      }
    },

    createComponent() {
      this.report.districtList.map((district) => {
        district.dataList.map((item) => {
          const {
            subtitle,
            districtName,
            slogan,
            activityName,
            activityDescription,
            abilityLevelDes,
          } = item as IDistrictData
          const { education } = abilityLevelDes as IAbilityLevelDes

          this.componentList = []
          this.pageHeight = 0

          this.addComponentIfExist(SubTitle, subtitle)
          this.addComponentIfExist(DistrictName, districtName)
          this.addComponentIfExist(SloganComponent, slogan)
          this.addComponentIfExist(ActivityName, activityName)
          this.addComponentIfExist(ObjectivesComponent, activityDescription)

          this.createDomain(item)
          this.createQuestion(item)

          this.addComponentIfExist(FamilyEducationStrategy, education)

          this.pageList.push({ id: this.getId(), componentList: this.componentList })

          // console.log(JSON.parse(JSON.stringify(this.pageList)), 'pageList')
        })
      })
    },
    async getReport() {
      const request = this.report.isSingle
        ? getThoughtValuationReportSingle
        : getThoughtValuationReportSemester

      const { data, status } = await request({
        babyId: this.report.babyId,
        recordId: this.report.recordId,
      })

      if (status === 200) {
        const updatedReport = { ...this.report }
        Object.assign(updatedReport, data, { isGet: true })
        this.report = updatedReport

        // console.log(JSON.parse(JSON.stringify(this.report)), 'report')

        this.createComponent()
      }
    },
    init() {
      const { babyId, recordId, type: _type } = useRoute().query
      Object.assign(this.report, {
        babyId,
        recordId,
        isSingle: _type === '1' || _type === '2',
        isTeach: _type === '1' || _type === '3',
      })
    },
  },
})