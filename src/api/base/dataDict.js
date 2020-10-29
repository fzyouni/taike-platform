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
    params: {
      currentPage,
      pageSize
    },
    method: 'get'
  })
}
/**
 * 保存数据字典节点类别信息接口
 * @param nodeCode 节点编码
 * @param nodeName 节点名称
 * @param isLeaf 叶子节点标志
 * @param status 状态
 * @param remark 描述
 * @param nodeOrder 排序值
 * @returns {*}
 */
export const addSysDictNodeInfo = ({ nodeCode, nodeName, isLeaf, status, remark, nodeOrder }) => {
  return axios.request({
    url: 'sysDict/addSysDictNodeInfo',
    data: {
      nodeCode,
      nodeName,
      isLeaf,
      status,
      remark,
      nodeOrder
    },
    method: 'post'
  })
}
/**
 * 编辑指定的节点类别信息接口
 * @param nodeId 节点类别ID
 * @param nodeCode 节点编码
 * @param nodeName 节点名称
 * @param status 状态
 * @param remark 描述
 * @param nodeOrder 排序值
 */
export const updateSysDictNodeInfo = ({ nodeId, nodeCode, nodeName, status, remark, nodeOrder }) => {
  return axios.request({
    url: 'sysDict/updateSysDictNodeInfo',
    data: {
      nodeId,
      nodeCode,
      nodeName,
      status,
      remark,
      nodeOrder
    },
    method: 'post'
  })
}
/**
 * 更新指定节点状态值
 * @param nodeId 节点Id
 * @param status 状态
 */
export const updateSysDictNodeState = (nodeId, status) => {
  return axios.request({
    url: 'sysDict/updateSysDictNodeState',
    data: {
      nodeId,
      status
    },
    method: 'post'
  })
}
/**
 * 删除数据字典节点类型
 * @param nodeId
 * @returns {AxiosPromise}
 */
export const deleteSysDictNode = (nodeId) => {
  return axios.request({
    url: 'sysDict/deleteSysDictNode',
    data: {
      nodeId
    },
    method: 'post'
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
    params: {
      currentPage,
      pageSize,
      nodeId
    },
    method: 'get'
  })
}
