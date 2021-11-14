import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginForm.vue'
import adminLogin from '../views/adminLogin.vue'
import stuReg from '../views/StuRegLogin/stuRegForm'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/adminLogin', component: adminLogin },
  { path: '/stuRegForm', component: stuReg }
]

const router = new VueRouter({
  routes
})

export default router
