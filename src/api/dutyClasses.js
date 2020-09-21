import axios from '@/libs/api.request'

export const getDutyClassesList = (currentPage, pageSize) => {
  return axios.request({
    url: 'classes/showDutyClassesList',
    data: { currentPage, pageSize },
    method: 'post'
  })
}
