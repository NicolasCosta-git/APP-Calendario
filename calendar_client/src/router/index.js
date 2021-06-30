import { createRouter, createWebHistory } from "vue-router";
import Calendar from "../views/Calendar.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Events from "../views/Events.vue";
import axios from "axios";

async function UserAuth(to, from, next) {
  if (localStorage.getItem("token") != undefined) {
    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .post("http://localhost:3030/validate", {}, req)
      .then((res) => {
        if (res.data.valid) {
          next();
        } else {
          localStorage.removeItem("token");
          next("/");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        next("/");
      });
  } else {
    localStorage.removeItem("token");
    next("/");
  }
}

const routes = [
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    beforeEnter: UserAuth,
  },
  {
    path: "/",
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
    beforeEnter: UserAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
