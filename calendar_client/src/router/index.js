import { createRouter, createWebHistory } from "vue-router";
import Calendar from "../views/Calendar.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Events from "../views/Events.vue";

const routes = [
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/events",
    name: "events",
    component: Events,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
