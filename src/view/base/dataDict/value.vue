<template>
  <div>
    <Card>
      <Button style="margin: 10px 0;" type="primary" @click="addDictValue">新增</Button>
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出</Button>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
            show-total show-sizer show-elevator/>
    </Card>
    <Modal :title="dialogTitle" v-model="showDialog" :closable="false" :mask-closable="false" :width="40">
      <Form v-if="showDialog" ref="dictFormData" :model="formData" :rules="ruleValidate" :label-width="120"
            label-position="left">
        <FormItem label="字典值名称：" prop="dictKey">
          <Input type="text" v-model="formData.dictValue" :maxlength="50"/>
        </FormItem>
        <FormItem label="字典值编码：" prop="dictValue">
          <Input type="text" v-model="formData.dictKey" :maxlength="50"/>
        </FormItem>
        <FormItem label="字典值排序：" prop="dictOrder">
          <InputNumber :max="9999" :min="1" v-model="formData.dictOrder"/>
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
  </div>
</template>

<script>
import Tables from '_c/tables'
import {
  showSysDictValueList,
  addSysDictValueInfo,
  updateSysDictValueInfo,
  updateSysDictValueStatus,
  deleteSysDictValueInfo
} from '@/api/base/dataDictValue'

export default {
  name: 'dictValue',
  components: {
    Tables
  },
  data () {
    const that = this
    return {
      dialogTitle: '',
      showDialog: false,
      formData: {
        dictId: '',
        nodeId: this.nodeId,
        dictKey: '',
        dictValue: '',
        dictOrder: 1,
        status: '0',
        remark: ''
      },
      ruleValidate: {
        dictKey: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'blur'
          }
        ],
        dictValue: [
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
          title: '字典值编码',
          key: 'dictKey'
        },
        {
          title: '字典值名称',
          key: 'dictValue'
        },
        {
          title: '排序',
          key: 'dictOrder'
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
                  updateSysDictValueStatus(params.row.nodeId, value).then(res => {
                    const { code, message } = res
                    if (code === '200') {
                      that.$Message.info(message)
                    } else {
                      // todo 此处应阻止前端操作变化
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
          title: '字典描述',
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
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  'margin-right': '5px'
                },
                on: {
                  click: () => {
                    this.updateDictValueData(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteDictValueData(params.row)
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
  props: {
    nodeId: { required: true }
  },
  computed: {
    getNodeId () {
      return this.nodeId
    }
  },
  methods: {
    addDictValue () {
      this.dialogTitle = '添加字典属性'
      this.showDialog = true
    },
    updateDictValueData (row) {
      debugger
      this.dialogTitle = '编辑字典属性'
      Object.assign(this.formData, row)
      this.showDialog = true
    },
    deleteDictValueData (row) {
      this.$Modal.confirm({
        title: '删除操作',
        content: '确认删除' + row.dictKey + '字典值吗？',
        onOk: () => {
          deleteSysDictValueInfo(row.dictId).then(res => {
            const { code, message } = res
            if (code === '200') {
              this.$Message.success(message)
              this.initTableData()
            } else {
              this.$Message.error(message)
            }
          })
        }
      })
    },
    cancelForm () {
      this.showDialog = false
      this.clearFormData()
    },
    submitFormData () {
      this.$refs.dictFormData.validate(valid => {
        if (valid) {
          if (this.formData.dictId.length === 0) {
            debugger
            addSysDictValueInfo(this.formData).then(res => {
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
            updateSysDictValueInfo(this.formData).then(res => {
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
      showSysDictValueList(this.pageCurrent, this.pageSize, this.getNodeId).then(res => {
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
