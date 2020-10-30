import axios from '@/libs/api.request'

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
    params: {
      currentPage,
      pageSize,
      nodeId
    },
    method: 'get'
  })
}
/**
 * 新增数据字典值
 * @param nodeId 节点类别Id
 * @param dictKey 字典值key
 * @param dictValue 字典值value
 * @param remark 描述
 * @param status 状态
 * @param dictOrder 字典值排序
 * @returns {AxiosPromise}
 */
export const addSysDictValueInfo = ({ nodeId, dictKey, dictValue, remark, status, dictOrder }) => {
  return axios.request({
    url: 'sysDictValue/addSysDictValueInfo',
    data: {
      nodeId,
      dictKey,
      dictValue,
      remark,
      status,
      dictOrder
    },
    method: 'post'
  })
}
/**
 * 编辑字典
 * @param dictId 字典id
 * @param dictKey 字典key
 * @param dictValue 字典value
 * @param remark 描述
 * @param status 状态
 * @param dictOrder 排序值
 * @returns {AxiosPromise}
 */
export const updateSysDictValueInfo = ({ dictId, dictKey, dictValue, remark, status, dictOrder }) => {
  return axios.request({
    url: 'sysDictValue/updateSysDictValueInfo',
    data: {
      dictId,
      dictKey,
      dictValue,
      remark,
      status,
      dictOrder
    },
    method: 'post'
  })
}
/**
 * 更新字典值状态
 * @param dictId 字典id
 * @param status 状态值
 * @returns {AxiosPromise}
 */
export const updateSysDictValueStatus = (dictId, status) => {
  return axios.request({
    url: 'sysDictValue/updateSysDictValueStatus',
    data: {
      dictId,
      status
    },
    method: 'post'
  })
}
/**
 * 删除字典值
 * @param dictId
 * @returns {AxiosPromise}
 */
export const deleteSysDictValueInfo = (dictId) => {
  return axios.request({
    url: 'sysDictValue/deleteSysDictValueInfo',
    data: {
      dictId
    },
    method: 'post'
  })
}
