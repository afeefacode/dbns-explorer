import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '/', component: () => import('pages/EntityListPage.vue')}],
  }, {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: `/:entityType/:id`, component: () => import('pages/EntityDetailPage.vue')}],
  }, {
    path: '/',
    children: [{path: '/configurator', component: () => import('pages/Configurator.vue')}],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: '', component: () => import('pages/404.vue')}],

  },
];

export default routes;
