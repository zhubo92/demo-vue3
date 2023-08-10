import {
  IPermissionList,
  IRoleList,
  IUserDetail,
  IUserList,
} from '@/api/types/mock'
import { IPunchItem, IPunchQueryParams } from '@/api/types/punch'

export interface CountInterface {
  count: number
}
export interface IUser {
  userList: IUserList[]
  roleList: IRoleList[]
  permissionList: IPermissionList[]
  userDetail?: IUserDetail
  curId: number
}

export interface IPunch {
  list: IPunchItem[]
  queryParams: IPunchQueryParams
  total: number
}
