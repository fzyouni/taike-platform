import axios from '@/libs/api.request'

/**
 *值班班次接口
 * @param currentPage 当前页码
 * @param pageSize 页容量
 * @returns {*}
 */
export const getDutyClassesList = (currentPage, pageSize) => {
  return axios.request({
    url: 'classes/showDutyClassesList',
    data: { currentPage, pageSize },
    method: 'post'
  })
}
