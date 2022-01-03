<template>
  <el-select
    v-model="selectedValue"
    filterable
    remote
    placeholder="请输入关键词"
    prefix-icon="el-icon-search"
    :remote-method="remoteMethod"
    style="width: 560px"
    :loading="loading"
    @change="filterData(selectedValue)"
  >
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<style scoped></style>

<script>
export default {
  data () {
    return {
      options: [], // 模糊搜索的匹配项
      selectedValue: '', // 被选择的标签
      loading: false
    }
  },
  props: {
    selectedOptions: {
      // 所有选项
      type: Array,
      default: function () {
        return []
      }
    },
    selectedData: {
      // 所有数据
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    remoteMethod (query) {
      // 模糊搜索
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.selectedOptions.filter((item) => {
            // 下拉表中返回所有匹配到的选项
            return item.label.indexOf(query) > -1
          })
        }, 100)
      } else {
        this.options = []
      }
    },
    filterData (thislabel) {
      if (thislabel === ' ' || thislabel === '全部') {
        this.$emit('selectData', this.selectedData)
        this.options = []
        this.selectedValue = ''
      } else {
        this.$emit(
          'selectData',
          this.selectedData.filter((item) => {
            if (item.index1) return item.index1 === thislabel
            else return item.index === thislabel
          })
        )
      }
      this.options = []
      this.selectedValue = ''
    }
  }
}
</script>
