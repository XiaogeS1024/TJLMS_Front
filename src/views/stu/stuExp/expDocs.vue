<template>
  <v-container class="container--fluid">
    <el-card>
      <app-widget title="Complex Table" padding-hide>
        <h3 style="margin-bottom: 10px">
          文件中心{{ "\xa0\xa0\xa0\xa0" }}DOCUMENTS CENTER
        </h3>
        <!-- <v-divider style="margin-bottom:20px"></v-divider> -->
        <div slot="widget-content">
          <el-input
            placeholder="请输入文件名或教师工号搜索"
            v-model="search"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

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
        </div>
      </app-widget>
    </el-card>
  </v-container>
</template>

<style scoped>
.el-card {
  padding: 2%;
  width: 60%;
  margin-left: 20%;
  background-color: rgba(255, 255, 255, 0.562);
  border-radius: 20px;
  box-shadow: 10px 10px 20px #a0a0a0;
  border-radius: 20px;
}
.el-button {
  color: #fff;
}
.el-input {
  width: 50%;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'Documents',
  data: () => ({
    search: '',
    complex: {
      headers: [
        {
          text: '文件名称',
          value: 'name'
        },
        {
          text: '上传时间',
          value: 'uploadTime'
        },
        {
          text: '发布人',
          value: 'uploader'
        },
        {
          text: '操作',
          value: 'action'
        }
      ],
      items: []
    }
  }),
  methods: {
    async getAllByLabId () {
      const url = '/get/lab/material/' + sessionStorage.getItem('labId')
      await axios
        .get(url)
        .then((res) => {
          this.complex.items = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    download (name) {
      window.location.href =
        'http://114.55.35.220:8081/api/downloadFileLab/' + name
    }
  },
  created () {
    this.getAllByLabId()
  }
}
</script>
