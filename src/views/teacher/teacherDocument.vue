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
        <v-divider />
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-bottom"
                  @click="download(scope.row.name)"
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
        'pageNum=1&pageSize=20'
      await axios
        .get(url)
        .then((response) => {
          this.complex.items = response.data.content
        })
        .catch((err) => {
          this.errMsg = '暂无教学资料'
          console.log(err)
        })
    }
  },
  mounted () {
    this.getUploaderMaterials()
  }
}
</script>

<style scoped>
</style>
