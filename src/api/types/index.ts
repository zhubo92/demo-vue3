export interface IGetParams {
  apiKey: string
}
export interface IGetRes {
  area: string
  areaCode: string
  areaid: string
  dayList: any[]
}

export interface IMockLoginRes {
  name: string
}

export interface IGetListParams {
  page: number
  pageSize: number
}

export interface IRes {
  data: any
}
