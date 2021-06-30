<template>
  <div class="new-event-card">
    <div class="event-card">
      <div class="card-header">
        <a @click="closePopup()" href="#" class="exit-button"
          ><img src="../../assets/x-mark.png" alt=""
        /></a>
        <h1>{{ dataDay }}/{{ dataMonth }}/{{ year }} - Novo Evento</h1>
      </div>
      <div class="event-details">
        <p class="error" v-if="error !== undefined">*{{ error }}</p>
        <input
          type="text"
          v-model="title"
          placeholder="Nome do evento"
          class="event-name"
        />
        <div class="time-panel">
          <label for="time" class="time-label"> Começa às:</label>
          <input
            type="time"
            v-model="time.startingTime"
            id="time"
            class="event-time"
          />
        </div>
        <div class="time-panel">
          <label for="time" class="time-label"> Termina às:</label>
          <input
            type="time"
            v-model="time.endingTime"
            id="time"
            class="event-time"
          />
        </div>
        <textarea
          v-model="description"
          id=""
          cols="30"
          rows="10"
          placeholder="Descrição do evento"
          class="event-description"
        ></textarea>
        <button @click="createEvent()" type="submit" class="event-button">
          Criar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      dataDay: null,
      dataMonth: null,
      error: undefined,
      user_id: undefined,
      title: undefined,
      date: {
        day: undefined,
        month: undefined,
        year: undefined,
      },
      time: {
        startingTime: undefined,
        endingTime: undefined,
      },
      description: undefined,
    };
  },
  props: {
    day: Number,
    year: Number,
    month: Number,
  },
  methods: {
    // retorna o id do usuário
    getUser: async function() {
      await axios
        .post("http://localhost:3030/validate", {}, this.req)
        .then((res) => {
          this.user_id = res.data.data.id;
        })
        .catch(() => {
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
        });
    },
    // cria um novo evento
    createEvent: async function() {
      this.error = undefined;
      axios
        .post(
          "http://localhost:3030/newevent",
          {
            user_id: this.user_id,
            title: this.title,
            date: this.date,
            time: this.time,
            description: this.description,
          },
          this.req
        )
        .then(() => {
          this.$router.go(0);
          this.closePopup();
          return;
        })
        .catch((err) => {
          console.log(err.response);
          this.error = err.response.data.error;
        });
    },
    // fecha o popup
    closePopup: function() {
      this.$emit("closePopup");
    },
  },
  async created() {
    await this.getUser();
    this.date.day = this.day;
    this.date.year = this.year;
    this.date.month = this.month;
    this.day < 10 ? (this.dataDay = "0" + this.day) : (this.dataDay = this.day);
    this.month < 10
      ? (this.dataMonth = "0" + (this.month + 1))
      : (this.dataMonth = this.month + 1);
  },
};
</script>

<style scoped>
.new-event-card {
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex; /* flex */
  justify-content: center;
  border: 1px solid;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.7);
  padding: 20px;
  min-width: 540px;
  z-index: 1;
}

.event-card {
  margin: auto;
  width: 600px;
  border-radius: 13px;
  height: 730px;
  background-color: #e9e7e7;
  border: 1px solid rgba(0, 0, 0, 0.212);
  overflow: hidden;
}

.card-header {
  background-color: #80cbc4;
}
.card-header h1 {
  padding: 10px;
  padding-bottom: 25px;
  text-align: center;
}

.event-details {
  padding: 30px;
}

.event-name {
  display: block;
  border: none;
  padding: 12px;
  width: 100%;
  font-size: 1.2em;
  border-radius: 8px;
  margin: 0px 0 20px 0;
}

.event-name:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.time-panel {
  float: left;
  width: 50%;
  color: #2c3e50e1;
}

.event-time {
  display: block;
  margin: auto;
  border: none;
  padding: 12px;
  font-size: 2em;
  color: #2c3e50;
  border-radius: 30px;
}

.event-time:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.event-time:hover {
  cursor: pointer;
}

.time-label {
  display: block;
  text-align: center;
  font-size: 1.2em;
  padding-bottom: 5px;
}

.event-description {
  border: none;
  max-width: 100%;
  min-width: 100%;
  max-height: 300px;
  min-height: 300px;
  padding: 15px;
  margin-top: 30px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.315);
  border-radius: 8px;
  font-size: 1.6em;
  color: #2c3e50e5;
}

.event-description:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.event-button {
  width: 100%;
  border: none;
  line-height: 50px;
  margin-top: 20px;
  background-color: #b2dfdb;
  border-radius: 8px;
  font-size: 1.7em;
  color: #2c3e50;
}

.event-button:hover {
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
  background-color: #b4e2de;
  color: #354a5ff3;
  cursor: pointer;
}

.error {
  color: rgba(221, 22, 22, 0.76);
  padding-bottom: 10px;
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
</style>
