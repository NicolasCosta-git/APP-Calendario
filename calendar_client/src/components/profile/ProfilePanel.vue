<template>
  <div>
    <div class="profilePanel">
      <div class="profile-card">
        <router-link :to="{ name: 'calendar' }" class="exit-button"
          ><img src="../../assets/x-mark.png" alt=""
        /></router-link>
        <div class="card-header">
          <h1>Editar perfil</h1>
        </div>
        <div class="card-body">
          <p class="error" v-if="error != undefined">* {{ error }}</p>
          <input
            type="text"
            class="email-input"
            placeholder="Digite seu email"
            v-model="email"
          />
          <input
            type="password"
            class="password-input"
            placeholder="Digite sua nova senha"
            v-model="password"
          />
          <input
            type="password"
            class="password-input"
            placeholder="Digite sua nova senha novamente"
            v-model="passwordCheck"
          />
          <div class="profile-button-div">
            <button @click="updateUser()" class="profile-button">Salvar</button>
            <button @click="deleteUser()" class="profile-button-delete">
              Excluir conta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as fakeEnv from "../../fakeEnv"


export default {
  data() {
    return {
      success: "",
      id: "",
      email: "",
      password: "",
      passwordCheck: "",
      url: fakeEnv.ENV.url,
      error: undefined,
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    };
  },
  methods: {
    // efetua o registro do usuário,
    getUser: async function() {
      await axios
        .post(`${this.url}validate`, {}, this.req)
        .then((res) => {
          this.email = res.data.data.email;
          this.id = res.data.data.id;
        })
        .catch(() => {
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
        });
    },
    updateUser: async function() {
      if (this.password && this.email) {
        if (this.passwordCheck) {
          if (this.password === this.passwordCheck) {
            await axios
              .put(
                `${this.url}user/${this.id}`,
                {
                  email: this.email,
                  password: this.password,
                },
                this.req
              )
              .then(() => {
                localStorage.removeItem("token");
                this.$router.push({ name: "login" });
              })
              .catch((err) => console.log(err));
          } else {
            this.error = "As senhas não são iguais";
          }
        } else {
          this.error = "Preencha sua senha novamente";
        }
      } else if (this.email) {
        await axios
          .put(
             `${this.url}user/${this.id}`,
            {
              email: this.email,
            },
            this.req
          )
          .then(() => {
            localStorage.removeItem("token");
            this.$router.push({ name: "login" });
          })
          .catch((err) => console.log(err));
      } else {
        this.error = "Preencha o campo de email e/ou senhas para atualizar";
      }
    },
    deleteUser: async function() {
      await axios
        .delete( `${this.url}user/${this.id}`, this.req)
        .then(() => {
          this.success = true;
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
        })
        .catch((this.error = "Erro ao deletar"));
    },
  },
  async created() {
    await this.getUser();
  },
};
</script>

<style scoped>
.profilePanel {
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

.profile-button-div {
  display: flex;
  margin-top: 30px;
  justify-content: space-around;
}

.profile-card {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  width: 600px;
  border-radius: 13px;
  height: 390px;
  background-color: #e9e7e7;
  overflow: hidden;
}

.profile-card h1 {
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

.exit-button {
  position: relative;
  display: inline;
  width: 100%;
  text-align: right;
  top: 10px;
  right: 10px;
  float: right;
  opacity: 0.62;
}

.password-input:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.profile-button {
  /* margin: auto; */
  display: block;
  width: 40%;
  border: none;
  border-radius: 8px;
  line-height: 40px;
  background: #b2dfdb;
  font-size: 1.3em;
  color: #2c3e50;
}

.profile-button-delete {
  /* margin: auto; */
  display: block;
  width: 40%;
  border: none;
  border-radius: 8px;
  line-height: 40px;
  background: #ff6152de;
  font-size: 1.3em;
  color: #2c3e50;
}

.profile-button-delete:hover {
  background-color: #ff61529d;
}

.profile-button:hover {
  background-color: #4699924d;
}

.profile-button:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.profile-button:active {
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
