import axios from '@/libs/api.request'

/**
 *月值班计划
 * @param year 年份信息
 * @param month 月份信息
 * @returns {*}
 */
export const getDutyPlan = (year, month) => {
  return axios.request({
    url: 'duty/getDutyPlanByYearAndMonth',
    params: { year, month },
    method: 'get'
  })
}
