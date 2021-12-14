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
        path: '/stuNoticeBoard',
        name: 'StudentNoticeBoard',
        meta: {
          title: '公告板'
        },
        component: () => import('../views/stu/stuNoticeBoard.vue')
      },
      {
        path: '/stuFeedback',
        name: 'StudentFeedback',
        meta: {
          title: '反馈列表'
        },
        component: () => import('../views/stu/stuFeedback.vue')
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
  },
  {
    path: '/teacherHome',
    name: 'TeacherHome',
    redirect: '/teacherDashboard',
    visible: true,
    component: () => import('../views/teacher/teacherHome.vue'),
    children: [
      {
        path: '/teacherDashboard',
        name: 'TeacherDashboard',
        meta: {
          title: '控制面板'
        },
        component: () => import('../views/teacher/teacherDashboard.vue')
      },
      {
        path: '/teacherLab',
        name: 'TeacherLab',
        meta: {
          title: '实验管理'
        },
        component: () => import('../views/teacher/teacherLab.vue')
      },
      {
        path: '/teacherDocument',
        name: 'TeacherDocument',
        meta: {
          title: '文件中心'
        },
        component: () => import('../views/teacher/teacherDocument.vue')
      },
      {
        path: '/assignment',
        name: 'Assignment',
        meta: {
          title: '作业批改'
        },
        component: () => import('../views/teacher/assignment.vue')
      },
      {
        path: '/teacherClass',
        name: 'TeacherClass',
        meta: {
          title: '班级管理'
        },
        component: () => import('../views/teacher/teacherClass.vue')
      },
      {
        path: '/teacherNotice',
        name: 'TeacherNotice',
        meta: {
          title: '消息中心'
        },
        component: () => import('../views/teacher/teacherNotice.vue')
      },
      {
        path: '/teacherNoticeBoard',
        name: 'TeacherNoticeBoard',
        meta: {
          title: '公告板'
        },
        component: () => import('../views/teacher/teacherNoticeBoard.vue')
      },
      {
        path: '/teacherFeedback',
        name: 'TeacherFeedback',
        meta: {
          title: '反馈列表'
        },
        component: () => import('../views/teacher/teacherFeedback.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
