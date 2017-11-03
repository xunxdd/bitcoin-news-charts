import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CoinNews from '@/components/CoinNews'
import FinancialChart from '@/components/FinancialChart'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: FinancialChart
    },
    { path: '/hello', component: HelloWorld },
    {
      path: '/news/:src',
      name: 'News',
      component: CoinNews,
      props: true
    },
    {
      path: '/chart/:coin',
      name: 'Chart',
      component: FinancialChart,
      props: true
    }
  ]
})
