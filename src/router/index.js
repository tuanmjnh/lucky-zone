import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'
import * as storageAuth from '@/plugins/storage-auth'
Vue.use(VueRouter)
// Routes
const routes = [
  // {
  //   path: '/',
  //   redirect: { name: 'dashboard' }
  // },
  {
    path: '/dashboard',
    name: 'dashboard',
    alias: '',
    meta: { desc: 'dashboard', auth: true, roles: ['dashboard.select'] },
    component: () => import('@/views/dashboard/index'),
  },
  {
    path: '/calculate',
    name: 'calculate',
    alias: '',
    meta: { desc: 'calculate', auth: true, roles: ['calculate.select'] },
    component: () => import('@/views/calculate/index'),
  },
  {
    // not found handler
    path: '*',
    name: 'not-found',
    alias: '',
    meta: { desc: 'Not found', auth: false, roles: ['*'] },
    component: () => import('@/views/not-found/index'),
  }
]

// Routing logic
// console.log(process.env.NODE_ENV)
var router = new VueRouter({
  // base: process.env.NODE_ENV === 'production' ? 'portal' : '/',
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function (to, from, savedPosition) {
    // console.log(router)
    // if(!store.state.auth.isAuth)
    // route.push('auth')
    // console.log(to, from)
    return savedPosition || { x: 0, y: 0 }
  }
})
// Some middleware to help us ensure the user is authenticated.
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth) && !storageAuth.Authenticated()) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     window.console.log('Not authenticated')
//     next({ path: '/auth', query: { redirect: to.fullPath } })
//   } else next()
// })

export default router
