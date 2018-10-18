import Vue from 'vue'
import VueRouter from 'vue-router'
import TrendPage from '@/components/TrendPage'
import TrendsPage from '@/components/TrendsPage'

Vue.use(VueRouter)

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: '/trend',
      name: 'TrendPage',
      component: TrendPage
    }, {
      path: '/trends',
      name: 'TrendsPage',
      component: TrendsPage
    }
  ]
})
