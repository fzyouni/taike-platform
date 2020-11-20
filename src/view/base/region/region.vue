<template>
  <div>
    <Card shadow>
      <tree-table expand-key="districtId" :expand-type="false" :selectable="false" :show-index="true" :columns="columns"
                  :data="data">
      </tree-table>
      <page :total="dataCount" :page-size="pageSize" @on-change="changePage" @on-page-size-change="nowPageSize"
            show-total show-sizer show-elevator/>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'tree_table_page',
  data () {
    return {
      dataCount: 0,
      pageSize: 10,
      columns: [
        {
          title: '地区编码',
          key: 'districtId'
        },
        {
          title: '地区名称',
          key: 'districtName'
        },
        {
          title: '简称',
          key: 'shortName'
        },
        {
          title: '城市编码',
          key: 'cityCode'
        },
        {
          title: '邮政编码',
          key: 'yzCode'
        },
        {
          title: '拼音',
          key: 'pinyin'
        }
      ],
      data: []
    }
  },
  methods: {
    changePage () {
    },
    nowPageSize () {
    },
    handle (scope) {
      console.log(scope)
    }
  }
}
</script>

<style>

</style>
