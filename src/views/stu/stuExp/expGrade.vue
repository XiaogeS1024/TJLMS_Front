<template>
  <div class="text-center">
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <v-card class="mx-4 rounded-xl pa-4 mt-5" :elevation=10>
            <h3 style="margin-left:20px;margin-top:15px">作业成绩{{ "\xa0\xa0\xa0\xa0" }}MY SCORE</h3>
            <v-divider></v-divider>
            <v-row>
<!--            <v-col cols="12" sm="3">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="value"-->
<!--                color="amber"-->
<!--            >-->
<!--            {{ value }}/100-->
<!--            </v-progress-circular><br />-->
<!--            <span>考勤成绩</span>-->
<!--            </v-col>-->
            <v-col cols="12" sm="3">
            <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="valueFinal"
                color="cyan"
            >
            {{ this.final }}/100
            </v-progress-circular><br />
            <span>作业成绩</span>
            </v-col>
<!--            <v-col cols="12" sm="6">-->
<!--            <v-progress-circular-->
<!--                :rotate="-90"-->
<!--                :size="120"-->
<!--                :width="15"-->
<!--                :value="value"-->
<!--                color="pink"-->
<!--            >-->
<!--            {{ value }}/100-->
<!--            </v-progress-circular><br />-->
<!--            <span>总成绩</span>-->
<!--            </v-col>-->
            </v-row>
          </v-card>

          <v-card class="mx-4 rounded-xl pa-4 mt-7"  :elevation=10>
            <v-row>
              <v-col cols="12" sm="8">
                <h3 style="margin-left:10px;margin-top:15px">教师批注{{ "\xa0\xa0\xa0\xa0" }}TEACHER'S COMMENT</h3>
                <v-divider></v-divider>
                <span>{{this.note}}</span>
              </v-col>
              <v-col cols="12" sm="4">
                <v-img src="@/assets/3.png" class="mt-n16" width="300px"></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-card class="mx-4 rounded-xl pa-4 mt-10" :elevation=10>
            <h3 style="font-size:20px">我的提交{{ "\xa0\xa0\xa0\xa0" }}MY SUBMISSION</h3>
            <v-divider></v-divider>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      stuId: JSON.parse(sessionStorage.getItem('detail')).id,
      labId: sessionStorage.getItem('labId'),
      // intervalAttend: {},
      intervalFinal: {},
      // attendance: 0.0,
      final: 0.0,
      // valueAttend: 0.0,
      valueFinal: 0.0,
      note: ''
    }
  },
  async mounted () {
    await this.queryParticular()
    this.intervalFinal = setInterval(() => {
      if (this.valueFinal === this.final) {
        return (this.valueFinal = this.final)
      }
      this.valueFinal += 0.1
    }, 0.1)
  },
  async queryParticular () {
    const url = '/get/particular/grade?labId=' + this.labId + '&stuId=' + this.stuId
    await axios.get(url)
      .then(
        (res) => {
          this.note = res.data.note
          this.final = res.data.score
        }
      )
      .catch(
        (err) => {
          console.log(err)
        }
      )
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
