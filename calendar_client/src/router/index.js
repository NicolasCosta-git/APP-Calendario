import { createRouter, createWebHistory } from "vue-router";
import Calendar from "../views/Calendar.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Events from "../views/Events.vue";
import Profile from "../views/Profile.vue";
import axios from "axios";
import * as fakeEnv from "../fakeEnv"

async function UserAuth(to, from, next) {
  const url = fakeEnv.ENV.url;

  if (localStorage.getItem("token") != undefined) {
    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await axios
      .post(`${url}validate`, {}, req)
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
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: UserAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
