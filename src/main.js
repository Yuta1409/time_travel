import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import DestinationsView from './views/DestinationsView.vue'
import ReservationView from './views/ReservationView.vue'
import './public/assets/css/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'TimeTravel Agency' } },
    { path: '/destinations', component: DestinationsView, meta: { title: 'Destinations — TimeTravel Agency' } },
    { path: '/reservation', component: ReservationView, meta: { title: 'Réservation — TimeTravel Agency' } }
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 130, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'TimeTravel Agency'
})

const app = createApp(App)
app.use(router)
app.mount('#app')