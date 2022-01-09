<template>
  <v-container class="container--fluid">
    <app-widget title="Complex Table" padding-hide>
      <div slot="widget-content">
        <!-- <v-app-bar card color="white">
          <v-text-field
            v-model="search"
            flat
            solo
            prepend-icon="mdi-magnify"
            placeholder="输入要查找的关键字"
            hide-details
            class="hidden-sm-and-down"
          />
          <v-btn icon>
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </v-app-bar> -->
<!--        <v-divider />-->
        <v-card-text class="pa-0">
          <!-- <v-data-table
            v-model="complex.selected"
            :headers="complex.headers"
            :search="search"
            :items="complex.items"
            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"
            class="elevation-1"
            item-key="name"
            select-all
          >
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox v-model="props.selected" primary hide-details />
              </td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.labId }}</td>
              <td>{{ props.item.uploadTime }}</td>
              <td>{{ props.item.uploader }}</td>
              <td>
                <v-btn depressed outlined icon dark color="primary" small>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn depressed outlined icon dark color="pink" small>
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table> -->
          <h3> 在此对您上传的文件进行处理</h3>
          <el-table
            :data="complex.items"
            v-loading="loading"
            element-loading-text="拼命加载中"
            style="width: 100%"
          >
            <el-table-column prop="name" label="文件名称" width="180">
            </el-table-column>
            <el-table-column prop="labId" label="所属实验" width="180">
            </el-table-column>
            <el-table-column prop="uploadTime" label="上传时间" width="180">
            </el-table-column>
            <el-table-column prop="uploader" label="发布人" width="180">
            </el-table-column>
            <el-table-column label="下载">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-bottom"
                  @click="download(scope.row.name)"
                  circle
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除">
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="confirm(scope.row)"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </v-card-text>
      </div>
    </app-widget>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Documents',
  data: () => ({
    search: '',
    complex: {
      selected: [],
      // headers: [
      //   {
      //     text: '文件名称',
      //     value: 'name'
      //   },
      //   {
      //     text: '所属模块',
      //     value: 'experiment'
      //   },
      //   {
      //     text: '上传时间',
      //     value: 'time'
      //   },
      //   {
      //     text: '发布人',
      //     value: 'author'
      //   },
      //   {
      //     text: '操作',
      //     value: 'action'
      //   }
      // ],
      items: []
    }
  }),
  methods: {
    async getUploaderMaterials () {
      const url =
        '/get/uploader/material/' +
        JSON.parse(sessionStorage.getItem('detail')).id +
        '?pageNum=1&pageSize=20'
      await axios
        .get(url)
        .then((response) => {
          this.complex.items = response.data.data.content
          console.log(this.complex.items)
        })
        .catch((err) => {
          this.errMsg = '暂无教学资料'
          console.log(err)
        })
    },
    download (name) {
      window.location.href =
        'http://114.55.35.220:8081/api/downloadFileLab/' + name
    },
    async del (id) {
      const url = '/delete/material/' + id
      await axios.post(url)
        .then(
          (res) => {
            this.$message.success('删除成功')
            console.log(res)
          }
        )
        .catch(
          (err) => {
            this.$message.error('删除失败')
            console.log(err)
          }
        )
    },
    confirm (row) {
      this.$confirm(
        '你确定要删除此文件吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.del(row.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    }
  },
  mounted () {
    this.getUploaderMaterials()
  }

}
</script>

<style scoped>
.el-button{
  color: #FFFFFF;
}
</style>
