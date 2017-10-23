import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CoinNews from '@/components/CoinNews'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    { path: '/hello', component: HelloWorld },
    {
      path: '/news/:src',
      name: 'News',
      component: CoinNews,
      props: true
    }
  ]
})
