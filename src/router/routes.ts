import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/list/ActorList.vue') }],
  },
  {
    path: '/actors',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/list/ActorList.vue') }],
  },
  {
    path: '/actors/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/detail/ActorDetail.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
