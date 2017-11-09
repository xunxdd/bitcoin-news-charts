import Vue from 'vue'
import Router from 'vue-router'
import CoinNews from '@/components/CoinNews'
import FinancialChart from '@/components/FinancialChart'
import GoogleTrendAndPriceChart from '@/components/googleTrendClose'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: FinancialChart
    },
    {
      path: '/trend/:coin',
      name: 'Trend',
      component: GoogleTrendAndPriceChart,
      props: true
    },
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
