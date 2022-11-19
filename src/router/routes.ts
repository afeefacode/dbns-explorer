import {RouteRecordRaw} from 'vue-router';
import {getEntityList} from 'src/utils'

const entityRoutes: RouteRecordRaw[] = []

getEntityList().forEach(entityName => {
  entityRoutes.push({
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: `/${entityName}s`, component: () => import('pages/EntityListPage.vue')}],
  })
  entityRoutes.push({
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{path: `/${entityName}s/:id`, component: () => import('pages/EntityDetailPage.vue')}],
  })
})

const routes: RouteRecordRaw[] = [
    ...entityRoutes,
  {
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
