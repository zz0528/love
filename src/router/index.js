import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/Console',
    name: 'Console',
    component: () => require.ensure([], (require) => require('@/views/Console.vue')),
  },
  {
    path: '/',
    name: 'home',
    component: () => require.ensure([], (require) => require('@/views/home/index.vue')),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
