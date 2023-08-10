import { defineStore } from 'pinia'
import { IPunch } from '@/store/modules/types'
import { getPunchActivityList } from '@/api/punch'

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
