import Libros from '@/components/Libros.vue'
import Biblioteca from '@/components/Biblioteca.vue'
import BibliotecaDashboard from '@/pages/BibliotecaDashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: BibliotecaDashboard, children: [
        { path: 'libros/nuevo', component: Libros },
        {path: 'libros', component: Biblioteca},
      ]
    }
  ],
})

export default router
