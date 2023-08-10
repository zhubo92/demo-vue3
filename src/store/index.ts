import { createPinia } from 'pinia'
import {useReportStore} from './modules/report'
import {usePunchStore} from './modules/punch'

export { useReportStore, usePunchStore }
export default createPinia()