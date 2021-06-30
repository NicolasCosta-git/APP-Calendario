<template>
  <div class="main">
    <div @click="actionToggle()" class="action">
      <span>+</span>
      <ul>
        <li>
          <router-link :to="{ name: 'events' }">Meus eventos</router-link>
        </li>
        <li>
          <a @click="logOut()" href="#">Sair</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    actionToggle: function() {
      let action = document.querySelector(".action");
      action.classList.toggle("active");
    },
    logOut: function() {
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
  cursor: pointer;
}

.action {
  position: fixed;
  bottom: 100px;
  left: 91%;
  width: 50px;
  height: 50px;
  background: #b2dfdb;
  border-radius: 50%;
  box-shadow: 0 tpx tpx rgba(0, 0, 0, 0.1);
}

.action span {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  font-size: 2em;
  transition: 0.3s ease-in-out;
}

.action:hover span {
  transform: rotate(135deg);
}

.action ul {
  position: absolute;
  right: 15px;
  bottom: 55px;
  background: #b2dfdb;
  min-width: 150px;
  padding: 20px;
  border-radius: 20px;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.action.active ul {
  bottom: 70px;
  opacity: 1;
  visibility: visible;
  transition: 0.3s;
}

.action ul li {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
  transition: 0.3s;
}

.action ul li:hover {
  font-weight: 600;
}

.action ul li a {
  text-decoration: none;
  border-bottom: 1px solid #2c3e5083;
  font-weight: 600;
  color: #2c3e50e7;
}

@media only screen and (max-width: 1733px) {
  .action {
    left: 90%;
    bottom: 30px;
  }
}

@media only screen and (max-width: 933px) {
  .action {
    left: 85%;
    bottom: 30px;
  }
}
</style>
