<template>
  <v-container class="container--fluid">
    <app-widget title="Complex Table" padding-hide>
      <div slot="widget-content">
        <v-app-bar card color="white">
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
        </v-app-bar>
        <v-divider />
        <v-card-text class="pa-0">
          <v-data-table
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
              <td>{{ props.item.experiment }}</td>
              <td>{{ props.item.date }}</td>
              <td>{{ props.item.author }}</td>
              <td>
                <v-btn depressed outlined icon dark color="primary" small>
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn depressed outlined icon dark color="pink" small>
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </div>
    </app-widget>
  </v-container>
</template>

<script>
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
          value: 'experiment'
        },
        {
          text: '上传时间',
          value: 'time'
        },
        {
          text: '发布人',
          value: 'author'
        },
        {
          text: '操作',
          value: 'action'
        }
      ],
      items: [
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        },
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        },
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        },
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        },
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        },
        {
          name: '这是一个电路实验2333',
          experiment: '实验一',
          time: '2021/12/09',
          author: '宋xg'
        }
      ]
    }
  })
}
</script>

<style scoped>

</style>
