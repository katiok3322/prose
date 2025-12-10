import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/Login.vue'
import About from './pages/About.vue'
import Price from './pages/Price.vue'
import Register from './pages/Register.vue' 

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  { path: '/register', component: Register }, 
  { path: '/about', component: About },
  { path: '/price', component: Price },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router