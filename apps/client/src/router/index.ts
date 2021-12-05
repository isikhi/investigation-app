import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/investigation-upload.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/inspect',
    name: 'Inspect',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/investigation-list.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
