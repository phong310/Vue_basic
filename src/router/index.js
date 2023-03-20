import { createRouter, createWebHistory } from 'vue-router';

// import Home from './views/Home.vue';
import Confirm from '../components/Select/confirm/index.vue'
import Notes from "../components/Notes/index.vue"
import Users from "../components/Users/index.vue"
import Select from "../components/Select/index.vue"

const routes = [
  {
    path: '/',
    name: 'note',
    component: Notes,
  },
  {
    path: '/user',
    name: 'user',
    component: Users,
  },
  {
    path: '/send-notify',
    name: 'send',
    component: Select,
  },
  {
    path: '/send-notify/confirm',
    name: 'confirm',
    component: Confirm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;