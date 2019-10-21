import Vue from 'vue'
import Router from 'vue-router'
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const city = r => require.ensure([], () => r(require('@/page/city')), 'city');
const delicious = r => require.ensure([], () => r(require('@/page/delicious')), 'delicious');
const search = r => require.ensure([], () => r(require('@/page/search')), 'search');
const order = r => require.ensure([], () => r(require('@/page/order')), 'order');
const profile = r => require.ensure([], () => r(require('@/page/profile')), 'profile');
const foot = r => require.ensure([], () => r(require('@/page/foot')), 'foot');
const shop = r => require.ensure([], () => r(require('@/page/shop')), 'shop');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: "/city",
      name: "city",
      component: city,
    },
    {
      path: "/delicious",
      name: "delicious",
      component: delicious,
    },
    {
      path: "/foot",
      name: "foot",
      component: foot
    },
    {
      path: "/search",
      name: "search",
      component: search,
    },
    {
      path: "/order",
      name: "order",
      component: order,
    },
    {
      path: "/profile",
      name: "profile",
      component: profile,
    },
    {
      path: "/shop",
      name: "shop",
      component: shop,
    }
  ]
})
