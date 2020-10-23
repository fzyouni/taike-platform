import axios from '@/libs/api.request'

/**
 *获取数据字典节点列表接口
 * @param currentPage 当前页码
 * @param pageSize 页容量
 * @returns {*}
 */
export const getDictNodeList = (currentPage, pageSize) => {
  return axios.request({
    url: 'sysDict/getSysDictNodeList',
    params: { currentPage, pageSize },
    method: 'get'
  })
}

/**
 * 根据节点类型获取对应的字典值列表
 * @param currentPage 当前页码
 * @param pageSize 页容量
 * @param nodeId 节点id
 * @returns {*}
 */
export const showSysDictValueList = (currentPage, pageSize, nodeId) => {
  return axios.request({
    url: 'sysDictValue/showSysDictValueList',
    params: { currentPage, pageSize, nodeId },
    method: 'get'
  })
}
