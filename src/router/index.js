import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginForm.vue'
import AdminLogin from '../components/admin/AdminLogin.vue'
import Reg from '../views/Register.vue'
// import PwdRecover from '../views/PasswordRecover.vue'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/adminLogin', component: AdminLogin },
  { path: '/reg', component: Reg },
  {
    path: '/stuHome',
    name: 'StudentHome',
    redirect: '/stuDashboard',
    visible: true,
    component: () => import('../views/stu/stuHome.vue'),
    children: [
      {
        path: '/stuDashboard',
        name: 'StudentDashboard',
        meta: {
          title: '控制面板'
        },
        component: () => import('../views/stu/stuDashboard.vue')
      },
      {
        path: '/stuLab',
        name: 'StudentLab',
        meta: {
          title: '实验中心'
        },
        component: () => import('../views/stu/stuLab.vue')
      },
      {
        path: '/stuDocument',
        name: 'StudentDocument',
        meta: {
          title: '文件中心'
        },
        component: () => import('../views/stu/stuDocument.vue')
      },
      {
        path: '/stuGrade',
        name: 'StudentGrade',
        meta: {
          title: '我的成绩'
        },
        component: () => import('../views/stu/stuGrade.vue')
      },
      {
        path: '/stuNotice',
        name: 'StudentNotice',
        meta: {
          title: '消息中心'
        },
        component: () => import('../views/stu/stuNotice.vue')
      },
      {
        path: '/stuInfo',
        name: 'StudentInfo',
        meta: {
          title: '个人中心'
        },
        component: () => import('../views/stu/stuInfo.vue')
      },
      {
        path: '/pwdRecover',
        name: 'PasswordRecover',
        meta: {
          title: '找回密码'
        },
        component: () => import('../views/PasswordRecover.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
