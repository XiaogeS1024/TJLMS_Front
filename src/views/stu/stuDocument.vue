<template>
  <v-container class="container--fluid">
                                 <h3 style="margin-bottom:10px">文件中心{{ "\xa0\xa0\xa0\xa0" }}DOCUMENTS CENTER</h3>
    <el-input
      placeholder="请输入文件名或教师工号搜索"
      v-model="search"
      clearable
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <app-widget title="Complex Table" padding-hide>
      <div slot="widget-content">
        <!--        <v-app-bar card color="white">-->
        <!--          <v-text-field-->
        <!--            v-model="search"-->
        <!--            flat-->
        <!--            solo-->
        <!--            prepend-icon="mdi-magnify"-->
        <!--            placeholder="输入要查找的关键字"-->
        <!--            hide-details-->
        <!--            class="hidden-sm-and-down"-->
        <!--          />-->
        <!--          <v-btn icon>-->
        <!--            <v-icon>mdi-filter</v-icon>-->
        <!--          </v-btn>-->
        <!--        </v-app-bar>-->
        <!-- <v-divider /> -->
        <v-card-text class="pa-0">
          <!--          <v-data-table-->
          <!--            v-model="complex.selected"-->
          <!--            :headers="complex.headers"-->
          <!--            :search="search"-->
          <!--            :items="complex.items"-->
          <!--            :rows-per-page-items="[10, 25, 50, { text: 'All', value: -1 }]"-->
          <!--            class="elevation-1"-->
          <!--            item-key="name"-->
          <!--            select-all-->
          <!--          >-->
          <!--            <template slot="items" slot-scope="props">-->
          <!--              <td>-->
          <!--                <v-checkbox v-model="props.selected" primary hide-details />-->
          <!--              </td>-->
          <!--              <td>{{ props.item.name }}</td>-->
          <!--              <td>{{ props.item.labId }}</td>-->
          <!--              <td>{{ props.item.uploadTime }}</td>-->
          <!--              <td>{{ props.item.uploader }}</td>-->
          <!--              <td >-->

          <!--              </td>-->
          <!--            </template>-->
          <template>
            <el-table
              :data="
                complex.items.filter(
                  (data) =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.uploader.toLowerCase().includes(search.toLowerCase())
                )
              "
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
            </el-table>
          </template>
          <!--          </v-data-table>-->
        </v-card-text>
      </div>
    </app-widget>
  </v-container>
</template>

<style scoped>
.el-button {
  color: #ffffff;
}
.el-input {
  margin-bottom: 10px;
}
.container--fluid {
  padding: 2%;
  width: 90%;
  margin-left: 5%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 20px #a0a0a0;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Documents',
  data: () => ({
    search: '',
    complex: {
      selected: [],
      headers: [
        {
          text: '文件名称',
          value: 'name'
        },
        {
          text: '所属模块',
          value: 'labId'
        },
        {
          text: '上传时间',
          value: 'uploadTime'
        },
        {
          text: '发布人',
          value: 'name'
        },
        {
          text: '操作',
          value: 'action'
        }
      ],
      items: []
    },

    pageNum: 1,
    pageSize: 20,
    errMsg: ''
  }),
  methods: {
    async getAllMaterials () {
      const url =
        '/get/all/material?pageNum=' +
        this.pageNum +
        '&pageSize=' +
        this.pageSize
      await axios
        .get(url)
        .then((response) => {
          this.complex.items = response.data.materials
        })
        .catch((err) => {
          this.errMsg = '暂无教学资料'
          console.log(err)
        })
    },
    download (name) {
      window.location.href =
        'http://114.55.35.220:8081/api/downloadFileLab/' + name
    }
  },
  created () {
    this.getAllMaterials()
  }
}
</script>
