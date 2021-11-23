import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginForm.vue'
import AdminLogin from '../components/admin/AdminLogin.vue'
import Reg from '../components/Register.vue'
import PwdRecover from '../components/PasswordRecover.vue'
// import AdminHome from '../components/admin/AdminHome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/adminLogin', component: AdminLogin },
  { path: '/reg', component: Reg },
  { path: '/pwdRecover', component: PwdRecover }
  // { path: '/adminHome', component: AdminHome }
]

const router = new VueRouter({
  routes
})

export default router
