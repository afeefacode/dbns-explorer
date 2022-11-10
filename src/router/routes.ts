import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/actors', component: () => import('pages/list/ActorList.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/actors/:id', component: () => import('pages/detail/ActorDetail.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/projects', component: () => import('pages/list/ProjectList.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/projects/:id', component: () => import('pages/detail/ProjectDetail.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/events', component: () => import('pages/list/EventList.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/events/:id', component: () => import('pages/detail/EventDetail.vue') }],
  },
  {
    path: '/',
    children: [{ path: '/configurator', component: () => import('pages/Configurator.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/404.vue') }],

  },
];

export default routes;
