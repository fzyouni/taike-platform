import axios from '@/libs/api.request'

/**
 *获取节假日列表
 * @param year 年份信息
 * @param month 月份信息
 * @returns {*}
 */
export const getHolidayList = (year, month) => {
  return axios.request({
    url: 'holiday/getHolidayList',
    data: { year, month },
    method: 'post'
  })
}
