export interface IPunchItem {
  joinWay: 0 | 1
  goodsId: string
  allowStartTime: string
  allowEndTime: string
  goalDays: number
  validDays: number
  unlockWay: 0 | 1
  progressBar: number
  checkInExplain: string
  poster: string
  createTime: string
  updateTime: string
  state: 0 | 1 | 2
  courseName: string
  suitAge: string
  imgCover: string
  imgCoverMini: string
  mediaType: MediaTypeEnum
  price: number
  courseSkuId: string
  chapterList: IChapter[]
  hasGroupBuyActivity: 0 | 1
  groupBuyActivityId: any
  purchased: 0 | 1
  joinCashbackActivity: 0 | 1
  id: string | number
  title: string
}

enum MediaTypeEnum {
  NO = 0,
  YES = 1,
  OTHER = 2,
}

export interface IPunchQueryParams {
  page: number
  pageSize: number
}

export interface IChapter {
  id: string
  name: string
  aiCourseSkuId: string
  sort: number
  coverImgUrl: any
  itemList: IChapterItem[]
}

export interface IChapterItem {
  id: string
  name: string
  videoId: string
  aiCourseSkuId: string
  sort: number
  createTime: string
  updateTime: string
  readCount: number
  aiCourseItemChapterId: string
  type: 0 | 1 | 2
  payType: 0 | 1 | 2
  freeTime: number
  audioId: any
  imgCover: string
  chapterSort: any
  video: any
  audio: any
  getRecord: any
  watchComplete: any
}
