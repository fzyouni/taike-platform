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
import { showSysDictValueList } from '@/api/base/dataDict'
export default {
  name: 'dictValue',
  components: {
    Tables
  },
  data () {
    return {
      pageSize: 10,
      dataCount: 0,
      pageCurrent: 1,
      columns: [
        { title: '字典值编码', key: 'dictKey' },
        { title: '字典值名称', key: 'dictValue' },
        { title: '排序', key: 'dictOrder' },
        { title: '状态', key: 'status' },
        { title: '字典描述', key: 'remark' },
        { title: '创建时间', key: 'createTime' }
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
      showSysDictValueList(this.pageCurrent, this.pageSize, this.getNodeId).then(res => {
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
