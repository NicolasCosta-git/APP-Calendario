<template>
  <div>
    <div class="loginPanel">
      <div class="login-card">
        <div class="card-header">
          <h1>Faça o login</h1>
        </div>
        <div class="card-body">
          <p class="error" v-if="error != undefined">* {{ error }}</p>
          <input
            type="text"
            name="email"
            class="email-input"
            placeholder="Digite seu email..."
            v-model="email"
          />
          <input
            type="password"
            v-model="password"
            class="password-input"
            placeholder="Digite sua senha..."
          />
          <button @click="login()" class="login-button">Entrar</button>
          <div class="links">
            <!-- <a href="#" class="forgot-password">Esqueceu sua senha ?</a> -->
            <span>
              <router-link :to="{name: 'register'}" class="new-account"
                >Ainda não possui uma conta ?</router-link
              ></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    // efetua o login
    login: function() {
      this.error = undefined;
      axios
        .post("http://localhost:3030/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          this.$router.push({ name: "calendar" });
        })
        .catch((err) => {
          
          this.error = err.response.data.status;
          console.log(this.error)
        });
    },
  },
};
</script>

<style scoped>
.loginPanel {
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex; /* flex */
  justify-content: center;
  border: 1px solid;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.7);
  padding: 20px;
  min-width: 540px;
  z-index: 1;
}

.login-card {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 13px;
  height: 375px;
  background-color: #e9e7e7;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.11);
}

.login-card h1 {
  padding: 25px;
  font-size: 2.5em;
  background-color: #b2dfdb;
}

.card-body {
  padding: 20px;
}

.error {
  color: rgba(221, 22, 22, 0.76);
}

.card-body input {
  display: block;
  border: none;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  line-height: 40px;
  border-radius: 8px;
  font-size: 1.1em;
  padding-left: 10px;
  color: #2c3e50;
}

.email-input {
  margin-top: 10px;
}

.email-input:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.password-input {
  margin-bottom: 20px;
}

.password-input:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.login-button {
  margin: auto;
  display: block;
  width: 60%;
  border: none;
  border-radius: 8px;
  line-height: 40px;
  background: #b2dfdb;
  font-size: 1.3em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.login-button:hover {
  background-color: #4699924d;
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.login-button:active {
  background-color: #8ddbd2bb;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
  text-decoration: none;
  font-size: 1.05em;
}

.card-body span {
  display: block;
  text-align: center;
  font-size: 1.05em;
}

.links {
  padding-top: 8px;
}

.black-bar {
  height: 3px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.836);
  margin-right: 7px;
  margin-left: 7px;
  margin-bottom: 10px;
}
.new-account {
  text-decoration: none;
}
</style>
