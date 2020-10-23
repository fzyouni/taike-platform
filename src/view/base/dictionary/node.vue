<template>
  <div>
    <Card>
      <Button style="margin: 10px 0;" type="primary" @click="addDictNode">新增</Button>
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出</Button>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
            show-total show-sizer show-elevator/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import dictValue from './value'
import { getDictNodeList } from '@/api/dictionary/node'
export default {
  name: 'dictNode',
  components: {
    Tables
  },
  data () {
    return {
      pageSize: 10,
      dataCount: 0,
      pageCurrent: 1,
      columns: [
        { title: '节点类别名称', key: 'nodeName' },
        { title: '节点类别编码', key: 'nodeCode' },
        { title: '叶子节点', key: 'isLeaf' },
        { title: '排序', key: 'nodeOrder' },
        { title: '状态', key: 'status' },
        { title: '节点描述', key: 'remark' },
        {
          title: '属性值设置',
          key: 'action',
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
                    this.$Modal.confirm({
                      scrollable: true,
                      width: 1000,
                      // 开启右上角关闭图标
                      closable: true,
                      render: (h) => {
                        return h(dictValue, {
                          props: { nodeId: params.row.nodeId }
                        })
                      }
                    })
                  }
                }
              }, '属性值列表')
            ])
          }
        },
        { title: '创建时间', key: 'createTime' }
      ],
      tableData: []
    }
  },
  methods: {
    addDictNode () {},
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
        this.pageSize = res.data.pages
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
