import axios from '@/libs/api.request'

export const getDutyPlan = (year, month) => {
  return axios.request({
    url: 'duty/getDutyPlanByYearAndMonth',
    params: { year, month },
    method: 'get'
  })
}
