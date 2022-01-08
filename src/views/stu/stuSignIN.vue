<template>
  <v-container class="container--fluid">
                                 <h3 style="margin-bottom:10px; text-align: center;">我的签到{{ "\xa0\xa0\xa0\xa0" }}STUDENT SIGNIN</h3>

    <app-widget title="Complex Table" padding-hide>
      <div slot="widget-content">
        <v-card-text class="pa-0">
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
