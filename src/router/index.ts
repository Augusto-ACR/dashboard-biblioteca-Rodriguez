import Racers from '@/components/Racers.vue'
import Telemetry from '@/components/Telemetry.vue'
import RaceDashboard from '@/pages/RaceDashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: RaceDashboard, children: [
        { path: 'racers', component: Racers },
        { path: 'telemetry', component: Telemetry },

      ]
    }
  ],
})

export default router
