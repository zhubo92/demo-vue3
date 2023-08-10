interface IBabyInfo {
  babyName: string
  className: string
  headImg: string
  parentId: string
  schoolName: string
  sendNumber: number
  valuationType: string
}

interface IAbilityLevelDes {
  behave: string
  education: string
  growth: string
  tactics: string
}

interface IStory {
  content: string
  description: null | string
  images: string[]
  questions: null | string[]
  videos: null | string[]
}

interface IDistrictData {
  abilityId: string
  abilityLevelDes: IAbilityLevelDes
  abilityLevelId: string
  abilityLevelName: string
  abilityLibraryId: any
  abilityName: string
  activityDescription: string
  activityId: string
  activityName: string
  babyId: string
  createTime: string
  districtId: string
  districtName: string
  domainAbilityId: string
  domainAbilityName: string
  domainId: string
  domainName: string
  id: string
  question: any
  questionCardUrl: any
  questionCardUrlList: any
  slogan: string
  story: IStory
  subtitle: string
  valuationDate: string
  valuationId: string
  valuationRecordId: string
  valuationType: string
}

interface IDistrict {
  dataList: IDistrictData[]
  districtName: string
  slogan: string
  subtitle: string
}

interface ILevel {
  abilityLevelName: string
  abilityName: string
}

interface IAbility {
  domainAbilityName: string
  level: ILevel
}

interface IDomain {
  abilityList: IAbility[]
  domainName: string
}

interface IRadarMap {
  max: number
  name: string
  value: number
}
export interface IReport {
  // 是否是单次测评
  isSingle: boolean
  // 是否教师端
  isTeacher: boolean
  // 是否从接口获取完数据
  isFinish: boolean
  babyId: string
  recordId: string
  babyInfo: IBabyInfo
  districtList: IDistrict[]
  domainList: IDomain[]
  radarMapList: IRadarMap[]
}

export interface IComponent {
  id: string | number
  view: any
  value: any
}

export interface IPage {
  id: string | number
  componentList: IComponent[]
}
