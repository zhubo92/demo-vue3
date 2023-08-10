import { defineStore } from 'pinia'
import { getPunchActivityList } from '@/api/punch'
import { IPunchItem, IPunchQueryParams } from '@/api/types/punch'
interface IPunch {
  list: IPunchItem[]
  queryParams: IPunchQueryParams
  total: number
}
export const usePunchStore = defineStore({
  id: 'punch',
  state: (): IPunch => {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      list: [],
      total: 0,
    }
  },
  getters: {},
  actions: {
    async getPunchList() {
      const { records, total } = (await getPunchActivityList(this.queryParams))
        .data
      this.list = records
      this.total = total
    },
  },
})
