<template>
  <div>
    <div class="registerPanel">
      <div class="register-card">
        <div class="card-header">
          <h1>Registre-se</h1>
        </div>
        <div class="card-body">
          <p class="error" v-if="error != undefined">* {{ error }}</p>
          <input
            type="text"
            class="email-input"
            placeholder="Digite seu email..."
            v-model="email"
          />
          <input
            type="password"
            class="password-input"
            placeholder="Digite sua senha..."
            v-model="password"
          />
          <button @click="register()" class="register-button">Registrar</button>
          <div class="links">
            <span>
              <router-link :to="{ name: 'login' }" class="have-account"
                >Já possui uma conta ?</router-link
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
    // efetua o registro do usuário
    register: function() {
      this.error = undefined;
      axios
        .post("http://localhost:3030/register", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          this.error = err.response.data.error;
        });
    },
  },
};
</script>

<style scoped>
.registerPanel {
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

.register-card {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 13px;
  height: 345px;
  background-color: #e9e7e7;
  overflow: hidden;
}

.register-card h1 {
  padding: 25px;
  font-size: 2.5em;
  background-color: #b2dfdb;
}

.error {
  color: rgba(221, 22, 22, 0.76);
}

.card-body {
  padding: 20px;
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

.register-button {
  margin: auto;
  display: block;
  width: 60%;
  border: none;
  border-radius: 8px;
  line-height: 40px;
  background: #b2dfdb;
  font-size: 1.3em;
  color: #2c3e50;
}

.register-button:hover {
  background-color: #4699924d;
}

.register-button:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.register-button:active {
  background-color: #8ddbd2bb;
}

.card-body span {
  display: block;
  text-align: center;
  font-size: 1.05em;
}

.links {
  padding-top: 13px;
}

.black-bar {
  height: 3px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.836);
  margin-right: 7px;
  margin-left: 7px;
  margin-bottom: 10px;
}
.have-account {
  text-decoration: none;
}
</style>
