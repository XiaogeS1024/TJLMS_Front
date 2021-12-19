
<template>
<el-container>
    <el-col :span="12">
    <!-- 定义model="searchForm"作为form表单名 -->
    <el-form
             ref="searchForm"
             :model="searchForm"
             label-width="130px"
             label-position="right"
             @submit.native.prevent>
        <el-row :gutter="40">
            <el-col :span="10">
                <el-form-item
                      label="审批状态："
                      prop="q">
                    <!-- 定义v-model="searchForm.checkstatus"作为select的value -->
                    <el-select
                               v-model="searchForm.checkstatus"
                               filterable
                               clearable
                               placeholder="请选择"
                               style="width:150px">
                        <!-- 数据从CHECK_STATUS外部导入加载 -->
                        <el-option
                              v-for="item in CHECK_STATUS"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"/>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</el-col>
<el-col
    :span="24"
    class="ibrain-search-panel__body__table">
    <el-table
              v-loading="listLoading"
              :stripe="true"
              :data="list"
              :fit="true"
              text-align="center"
              border>
        <el-table-column
              label="#"
              type="index"
              header-align="center"
              align="center"
              width="50"/>
    </el-table>
</el-col>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      pageSize: 20,
      currentPage: 1,
      total: 0,
      listLoading: false,
      list: [],
      // 接收值
      searchForm: {},
      // 外部导入数据源加载select标签

      CHECK_STATUS: [{
        value: 'PENDING',
        label: '待审批'
      }, {
        value: 'APPROVED',
        label: '已通过'
      }, {
        value: 'REJECT',
        label: '已拒绝'
      }, {
        value: 'CANCELLING',
        label: '撤销中'
      }, {
        value: 'CANCELED',
        label: '已撤销'
      }]

    }
  },
  // 在vue中，使用watch来响应数据的变化。
  watch: {
    // 检测这个select的value是否有变化，如果有就重新执行getData()方法
    'searchForm.checkstatus' () {
      this.getData()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 默认加载的表格数据
    getData () {
      this.listLoading = true
      this.$api.getOverWorkList({
        page: this.currentPage - 1,
        size: this.pageSize,
        sort: '',
        // 这里动态拿表单里面select下拉框的值传入，以实现动态搜索
        checkstatus: this.searchForm.checkstatus
      }).then(data => {
        this.list = data.content
        this.total = data.totalElements
        this.listLoading = false
      })
    }
  }
}
</script>
