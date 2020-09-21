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
import { getDutyClassesList } from '@/api/dutyClasses'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      pageSize: 10,
      dataCount: 0,
      pageCurrent: 1,
      columns: [
        { title: '班次名称', key: 'classesName' },
        { title: '班次编码', key: 'classesCode' },
        { title: '值班开始时间', key: 'classesStartTime' },
        { title: '值班结束时间', key: 'classesEndTime' },
        { title: '值班人数', key: 'classesPersonNumber' },
        { title: '值班排序', key: 'classesOrder' }
      ],
      tableData: [
        { classesId: 5, classesName: '夜班', classesCode: 'classes5', classesStartTime: '2019-10-14 18:00:00', classesEndTime: '2019-10-15 09:00:00', classesPersonNumber: 1, classesDeleteFlag: '0', classesOrder: 4 }]
    }
  },
  methods: {
    addClassesInfo () {},
    nowPageSize (index) {
      // 实时获取当前需要显示的条数
      this.pageSize = index
      this.initDutyClassesList()
    },
    changePage () {
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    initDutyClassesList () {
      getDutyClassesList(this.pageCurrent, this.pageSize).then(res => {
        const { data } = res.data
        this.dataCount = data.total
        this.pageSize = data.pages
        this.pageCurrent = data.current
        this.tableData = data.records
      })
    }
  },
  mounted () {
    this.initDutyClassesList()
  }
}
</script>
<style>
</style>
