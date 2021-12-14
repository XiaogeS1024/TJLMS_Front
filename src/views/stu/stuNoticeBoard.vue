<template>
<!-- eslint-disable -->
  <v-card>

    <v-list>
      <v-list-item-group v-model="selected" multiple active-class="blue--text">
        <template v-for="(item, index) in items">
          <v-list-item>
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title" style="font-size: 25px;font-weight:bold"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                  v-text="item.headline"
                  style="margin-top: 10px;font-size: 15px;font-weight:bold"
                ></v-list-item-subtitle>
                <v-divider></v-divider>
                <v-list-item-subtitle v-text="item.subtitle" style="margin-top: 10px;"></v-list-item-subtitle>
                <v-list-item-action>
                <v-list-item-action-text
                  v-text="item.action"
                ></v-list-item-action-text>
                <v-icon v-if="!active" color="grey lighten-1">
                  mdi-star
                </v-icon>

                <v-icon v-else color="yellow"> mdi-star </v-icon>
              </v-list-item-action>
                <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green lighten-2" dark v-bind="attrs" v-on="on" class="btn"> 点击查看详情  </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>
                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text  @click="dialog = false">我已知晓</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-list-item-content>

              
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend',
        title: 'Ali Connors',
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        action: '15 min',
        headline: 'Brunch this weekend',
        title: 'Ali Connors',
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        action: '15 min',
        headline: 'Brunch this weekend',
        title: 'Ali Connors',
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      }
    ],
    dialog: false
  })
}
</script>

<style scoped>
.btn{
  width: 20%;
}
</style>
