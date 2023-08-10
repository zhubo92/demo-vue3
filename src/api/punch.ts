import { IGetListParams } from '@/api/types'
import request from '@/service'

export const getPunchActivityList = (data: IGetListParams) => {
  return request({
    url: '/mall/cashback/activity/page',
    method: 'GET',
    data,
  })
}
