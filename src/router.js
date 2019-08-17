import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/comics',
      name: 'home',
      component: Home
    },
    {
      path: '/comics/:id',
      name: 'detail',
      component: Detail
    }
  ]
})
