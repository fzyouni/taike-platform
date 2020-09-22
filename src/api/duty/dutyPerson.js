import axios from '@/libs/api.request'

/**
 *获取值班人员列表
 * @param currentPage 当前页码
 * @param pageSize 页容量
 * @returns {*}
 */
export const getDutyPersonList = (currentPage, pageSize) => {
  return axios.request({
    url: 'dutyPerson/showDutyPersonList',
    data: { currentPage, pageSize },
    method: 'post'
  })
}
