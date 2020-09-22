<template>
  <div>
    <Card>
      <Button style="margin: 10px 0;" type="primary" @click="addClassesInfo">新增</Button>
      <Button style="margin: 10px;" type="primary" @click="exportExcel">导出</Button>
      <Tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"/>
      <page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
            show-total show-sizer show-elevator/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getDutyPersonList } from '@/api/duty/dutyPerson'
export default {
  name: 'dutyPerson',
  components: {
    Tables
  },
  data () {
    return {
      pageSize: 10,
      dataCount: 0,
      pageCurrent: 1,
      columns: [
        {
          title: '序号',
          width: 60,
          render: (h, params) => {
            return h('span', {
            }, params.index + 1)
          }
        },
        { title: '人员姓名', width: 100, key: 'personName' },
        { title: '系统登录名', width: 100, key: 'personLoginName' },
        { title: '人员类型', width: 100, key: 'personTypeName' },
        { title: '性别', width: 60, key: 'gender' },
        { title: '联系方式', width: 120, key: 'cellphone' },
        { title: '邮箱地址', width: 140, key: 'email' },
        { title: '是否参与排班', width: 120, key: 'autoDutyFlag' },
        { title: '排班编号', key: 'personNumber' }
      ],
      tableData: []
    }
  },
  methods: {
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
      getDutyPersonList(this.pageCurrent, this.pageSize).then(res => {
        const { data, status } = res
        if (status !== 200) {
          this.$Message.error('网络请求异常！')
        } else if (data.status === 'error') {
          this.$Message.error(data.message)
        } else {
          this.pageSize = data.data.pages
          this.dataCount = data.data.total
          this.pageCurrent = data.data.current
          this.tableData = data.data.records
        }
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
