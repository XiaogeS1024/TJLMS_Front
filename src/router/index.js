import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginForm.vue'
import AdminLogin from '../components/admin/AdminLogin.vue'
import Reg from '../views/Register.vue'
import AdminHome from '@/components/admin/AdminHome'
import teachers from '@/components/admin/teachers'
import students from '@/components/admin/students'
import PwdRecover from '../views/PasswordRecover.vue'
import batchteachers from '../components/admin/batchTeachers.vue'
import batchstudents from '../components/admin/batchStudents.vue'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/adminLogin', component: AdminLogin },
  { path: '/reg', component: Reg },
  { path: '/pwdRecover', component: PwdRecover },
  {
    path: '/adminHome',
    component: AdminHome,
    // redirect:'login',
    children: [
      { path: '/teachers', component: teachers },
      { path: '/students', component: students },
      { path: '/batchteachers', component: batchteachers },
      { path: '/batchstudents', component: batchstudents }
    ]
  },
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
        component: () => import('../views/stu/stuLab.vue'),
        children: [
          {
            path: '/stuExpReportSummator',
            name: 'StudentExpReportSummator',
            meta: {
              title: '报告填写'
            },
            component: () => import('../views/stu/stuExp/expReportSummator.vue')
          },
          {
            path: '/stuExpReportGeneral',
            name: 'StudentExpReportGeneral',
            meta: {
              title: '报告填写'
            },
            component: () => import('../views/stu/stuExp/expReportGeneral.vue')
          },
          {
            path: '/stuExpDocs',
            name: 'StudentExpDocs',
            meta: {
              title: '文件中心'
            },
            component: () => import('../views/stu/stuExp/expDocs.vue')
          },
          {
            path: '/stuExpGrade',
            name: 'StudentExpGrade',
            meta: {
              title: '作业详情'
            },
            component: () => import('../views/stu/stuExp/expGrade.vue')
          }
        ]
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
        path: '/stuSignIN',
        name: 'StudentSignIN',
        meta: {
          title: '我的签到'
        },
        component: () => import('../views/stu/stuSignIN.vue')
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
        component: () => import('../views/teacher/teacherLab.vue'),
        children: [
          {
            path: '/teacherAssignmentList',
            name: 'TeacherAssignmentList',
            meta: {
              title: '报告列表'
            },
            component: () => import('../views/teacher/assignmentList.vue')
          },
          {
            path: '/teacherAssignmentCheck',
            name: 'teacherAssignmentCheck',
            meta: {
              title: '批改报告'
            },
            component: () => import('../views/teacher/assignmentCheck.vue')
          },
          {
            path: '/teacherAssignmentSummatorCheck',
            name: 'teacherAssignmentSummatorCheck',
            meta: {
              title: '批改报告'
            },
            component: () => import('../views/teacher/asgSumerCheck.vue')
          }
        ]
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
        path: '/teacherSignIN',
        name: 'TeacherSignIN',
        meta: {
          title: '签到管理'
        },
        component: () => import('../views/teacher/teacherSignIN.vue')
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
        component: () => import('../views/teacher/Notices/noticeHome.vue')
      },
      {
        path: '/noticeManagement',
        name: 'TeacherNoticeBoard',
        meta: {
          title: '公告管理'
        },
        component: () => import('../views/teacher/Notices/noticeManagement.vue')
      },
      {
        path: '/teacherFeedback',
        name: 'TeacherFeedback',
        meta: {
          title: '反馈列表'
        },
        component: () => import('../views/teacher/Notices/feedback.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
