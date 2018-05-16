import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import Page from '../views/page/page.vue'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
import login from '../views/login'
import dashboard from '../views/dashboard'
import realtime from '../views/realtime'

const pages = [{
  path: 'dashboard',
  name: '首页',
  component: dashboard,
  meta: {
    title: '首页',
    icon: 'icon-dashboard1'
  }
}, {
  path: 'realtime',
  name: '实时数据',
  component: realtime,
  meta: {
    title: '实时数据',
    icon: 'icon-dashboard1'
  }
}]

export const constantRouterMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index'
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/index/dashboard',
    name: '仪表盘',
    meta: {
      title: '仪表盘',
      icon: 'icon-dashboard1'
    },
    children: pages
  },
  {
    path: '/page',
    component: Page,
    redirect: '/page/dashboard',
    name: '单页',
    meta: {
      title: '单页',
      icon: 'icon-dashboard1'
    },
    children: pages
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'icon-dashboard1' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'icon-dashboard' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'icon-dashboard' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'icon-dashboard' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
