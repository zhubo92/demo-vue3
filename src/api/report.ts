import request from '@/service'

// 获取单次测评报告
export function getThoughtValuationReportSingle(data: any) {
  return request({
    url: `/teach/thought/valuation/report/single`,
    method: 'GET',
    data,
  })
}

// 获取综合测评报告
export function getThoughtValuationReportSemester(data: any) {
  return request({
    url: `/teach/thought/valuation/report/semester`,
    method: 'GET',
    data,
  })
}

// 发送给家长-单次测评报告
export function sendToParentSingle(data: any) {
  return request({
    url: `/teach/thought/valuation/record/send/single`,
    method: `POST`,
    data,
  })
}

// 发送给家长-学期综合报告
export function sendToParentSemester(data: any) {
  return request({
    url: `/teach/thought/valuation/record/send/semester`,
    method: `POST`,
    data,
  })
}
