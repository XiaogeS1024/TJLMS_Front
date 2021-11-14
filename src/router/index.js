import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LoginForm.vue'
import AdminLogin from '../components/AdminLogin.vue'
import Reg from '../components/RegisterForm.vue'
import PwdRecover from '../components/PasswordRecover.vue'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/adminLogin', component: AdminLogin },
  { path: '/reg', component: Reg },
  { path: '/passwordRecover', component: PwdRecover }
]

const router = new VueRouter({
  routes
})

export default router
