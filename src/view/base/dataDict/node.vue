<template>
  <div>
    <Card>
      <Button style="margin: 10px 0;" type="primary" @click="addDictNode">新增</Button>
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出</Button>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
            show-total show-sizer show-elevator/>
    </Card>
    <Modal :title="dialogTitle" v-model="showDialog" :closable="false" :mask-closable="false" :width="40">
      <Form v-if="showDialog" ref="dictFormData" :model="formData" :rules="ruleValidate" :label-width="120"
            label-position="left">
        <FormItem label="节点类别名称：" prop="nodeName">
          <Input type="text" v-model="formData.nodeName" :maxlength="50"/>
        </FormItem>
        <FormItem label="节点类型编码：" prop="nodeCode">
          <Input type="text" v-model="formData.nodeCode" :maxlength="50"/>
        </FormItem>
        <FormItem label="节点排序：" prop="nodeOrder">
          <InputNumber :max="9999" :min="1" v-model="formData.nodeOrder"/>
        </FormItem>
        <!--<FormItem label="是否叶子节点：" prop="isLeaf">
          <RadioGroup v-model="formData.isLeaf">
            <Radio label="1">叶子节点</Radio>
            <Radio label="0">非叶子节点</Radio>
          </RadioGroup>
        </FormItem>-->
        <FormItem label="状态：">
          <i-switch v-model="formData.status" size="large" :true-value="'0'" :false-value="'1'">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="节点类型描述：" prop="remark">
          <Input type="text" v-model="formData.remark" :maxlength="100"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" ghost @click="cancelForm">取消</Button>
        <Button type="primary" @click="submitFormData">确定</Button>
      </div>
    </Modal>
    <Modal :title="dictValueTitle" v-model="showValueDialog" :closable="true" :mask-closable="false" :width="80">
      <DictValue v-if="showValueDialog" :node-id="dictValueNodeId"></DictValue>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import DictValue from './value'
import {
  getDictNodeList,
  addSysDictNodeInfo,
  updateSysDictNodeInfo,
  updateSysDictNodeState,
  deleteSysDictNode
} from '@/api/base/dataDictNode'

export default {
  name: 'dictNode',
  components: {
    DictValue,
    Tables
  },
  data () {
    const that = this
    return {
      dictValueTitle: '节点属性值列表',
      showValueDialog: false,
      dictValueNodeId: '',
      showDialog: false,
      dialogTitle: '',
      formData: {
        nodeId: '',
        nodeName: '',
        nodeCode: '',
        isLeaf: '1',
        nodeOrder: 1,
        status: '0',
        remark: ''
      },
      ruleValidate: {
        nodeName: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        nodeCode: [
          {
            required: true,
            message: '编码不能为空',
            trigger: 'blur'
          }
        ]
      },
      pageSize: 10,
      dataCount: 0,
      pageCurrent: 1,
      columns: [
        {
          title: '节点类别名称',
          key: 'nodeName'
        },
        {
          title: '节点类别编码',
          key: 'nodeCode'
        },
        {
          title: '是否叶子节点',
          key: 'isLeaf',
          render (h, params) {
            return h('span', params.row.isLeaf === '0' ? '否' : '是')
          }
        },
        {
          title: '排序',
          key: 'nodeOrder'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render (h, params) {
            return h('i-switch', {
              props: {
                'true-value': '0',
                'false-value': '1',
                size: 'large',
                value: params.row.status
              },
              on: {
                'on-change': (value) => {
                  updateSysDictNodeState(params.row.nodeId, value).then(res => {
                    const { code, message } = res
                    if (code === '200') {
                      that.$Message.info(message)
                    } else {
                      // todo 回改状态值
                      that.$Message.error(message)
                    }
                  })
                }
              }
            }, [
              h('span', {
                slot: 'open',
                domProps: { innerHTML: '启用' }
              }),
              h('span', {
                slot: 'close',
                domProps: { innerHTML: '禁用' }
              })
            ])
          }
        },
        {
          title: '节点描述',
          key: 'remark'
        },
        {
          title: '创建时间',
          width: 160,
          key: 'createTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary'
                },
                style: {
                  'margin-right': '5px'
                },
                on: {
                  click: () => {
                    this.dictValueNodeId = params.row.nodeId
                    this.showValueDialog = true
                  }
                }
              }, '属性值列表'),
              h('Button', {
                props: {
                  type: 'primary'
                },
                style: {
                  'margin-right': '5px'
                },
                on: {
                  click: () => {
                    this.updateRowData(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: () => {
                    this.deleteRow(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    addDictNode () {
      this.dialogTitle = '新增节点类别'
      this.showDialog = true
    },
    updateRowData (row) {
      this.dialogTitle = '编辑节点类别'
      Object.assign(this.formData, row)
      this.showDialog = true
    },
    deleteRow (row) {
      this.$Modal.confirm({
        title: '删除节点类型！',
        content: '确认删除' + row.nodeName + '节点类型吗？',
        onOk: () => {
          deleteSysDictNode(row.nodeId).then(res => {
            const { code, message } = res
            if (code === '200') {
              this.initTableData()
              this.$Message.info(message)
            } else {
              this.$Message.error(message)
            }
          })
        }
      })
    },
    submitFormData () {
      this.$refs.dictFormData.validate(valid => {
        if (valid) {
          if (this.formData.nodeId.length === 0) {
            addSysDictNodeInfo(this.formData).then(res => {
              if (res.code === '200') {
                this.showDialog = false
                this.clearFormData()
                this.initTableData()
                this.$Message.success(res.message)
              } else {
                this.$Message.error(res.message)
              }
            })
          } else {
            updateSysDictNodeInfo(this.formData).then(res => {
              const { code, message } = res
              if (code === '200') {
                this.showDialog = false
                this.clearFormData()
                this.initTableData()
                this.$Message.success(message)
              } else {
                this.$Message.error(message)
              }
            })
          }
        }
      })
    },
    cancelForm () {
      this.showDialog = false
      this.clearFormData()
    },
    clearFormData () {
      Object.assign(this.$data.formData, this.$options.data().formData)
    },
    nowPageSize (index) {
      this.pageSize = index
    },
    changePage () {
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    initTableData () {
      getDictNodeList(this.pageCurrent, this.pageSize).then(res => {
        this.pageSize = res.data.size
        this.dataCount = res.data.total
        this.pageCurrent = res.data.current
        this.tableData = res.data.records
      })
    }
  },
  mounted () {
    this.initTableData()
  }
}
</script>
<style>
</style>
