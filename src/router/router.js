import Main from '@/components/pages/Main'
import PostPage from '@/components/pages/PostPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/post/:id',
    component: PostPage
  },
  
]
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;