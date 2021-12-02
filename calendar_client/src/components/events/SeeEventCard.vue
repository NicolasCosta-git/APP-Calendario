<template>
  <div class="see-event-card">
    <div class="event-card">
      <div class="card-header">
        <a @click="closePopup()" class="exit-button"
          ><img src="../../assets/x-mark.png" alt=""
        /></a>
        <h1>{{ title }}</h1>
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
        <div class="date-panel">
          <label for="date" class="date-label">Dia do evento: </label>
          <input
            v-model="stringDate"
            id="date"
            type="date"
            class="event-date"
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
        <div class="button-panel">
          <button @click="updateEvent()" type="submit" class="save-button">
            Salvar
          </button>
          <button @click="deleteEvent()" class="delete-button">Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as fakeEnv from "../../fakeEnv";

export default {
  data() {
    return {
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      url: fakeEnv.ENV.url,
      stringDate: null,
      dataDay: null,
      dataMonth: null,
      error: undefined,
      id: undefined,
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
    Pid: Number,
    Puser_id: Number,
    Pday: Number,
    Pyear: Number,
    Pmonth: Number,
    Ptitle: String,
    PstartingTime: String,
    PendingTime: String,
    Pdescription: String,
  },
  methods: {
    //seta as variáveis com os dados do evento
    fillData: function () {
      this.id = this.Pid;
      this.user_id = this.Puser_id;
      this.title = this.Ptitle;
      this.date.day = this.Pday;
      this.date.month = this.Pmonth;
      this.date.year = this.Pyear;
      this.time.startingTime = this.PstartingTime;
      this.time.endingTime = this.PendingTime;
      this.description = this.Pdescription;
    },
    // faz update no evento
    updateEvent: async function () {
      this.error = undefined;
      this.transformDate();
      await axios
        .post(
          `${this.url}updateevent`,
          {
            id: this.id,
            user_id: this.user_id,
            title: this.title,
            date: this.date,
            time: this.time,
            description: this.description,
          },
          this.req
        )
        .then((res) => {
          console.log(res);
          this.$emit("hidePopup");
          window.location.reload();
        })
        .catch((err) => {
          this.error = err.response.data.error;
          console.log(err.response.data.error);
        });
    },
    // deleta evento
    deleteEvent: async function () {
      this.error = undefined;
      await axios
        .delete(
          `${this.url}deleteevent/` + this.user_id + "/" + this.id,
          this.req
        )
        .then(() => {
          this.closePopup();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // converte a data, adicionando 0 na frente dos números com dígitos únicos
    convertDate: function () {
      this.date.day < 10
        ? (this.dataDay = "0" + this.date.day)
        : (this.dataDay = this.date.day);
      this.date.month < 10
        ? (this.dataMonth = "0" + (this.date.month + 1))
        : (this.dataMonth = this.date.month + 1);
      this.stringDate =
        this.date.year + "-" + this.dataMonth + "-" + this.dataDay;
      return;
    },
    // transforma a data para um formato compatível
    transformDate: function () {
      let date = new Date(this.stringDate).toLocaleString("en-US");
      date = this.stringDate.replace(/\b0/g, "");
      date = date.split("-");
      this.date.day = date[2];
      this.date.month = parseInt(date[1]) - 1;
      this.date.year = date[0];
    },
    // fecha o popup
    closePopup: function () {
      this.$emit("hidePopup");
    },
  },
  created() {
    this.fillData();
    this.convertDate();
  },
};
</script>

<style scoped>
.see-event-card {
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
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
  height: 830px;
  background-color: #e9e7e7;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.212);
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

.button-panel {
  text-align: center;
}

.save-button {
  width: 45%;
  display: inline;
  border: none;
  line-height: 50px;
  margin-top: 20px;
  background-color: #b2dfdb;
  border-radius: 8px;
  font-size: 1.7em;
  color: #2c3e50;
  margin-right: 5px;
}

.save-button:hover {
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
  background-color: #b4e2de;
  color: #000000cb;
  cursor: pointer;
}

.delete-button {
  width: 45%;
  display: inline;
  border: none;
  line-height: 50px;
  margin-top: 20px;
  border-radius: 8px;
  font-size: 1.7em;
  margin-left: 5px;
  background-color: #ff6152de;
  color: #532020d8;
}

.delete-button:hover {
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
  background-color: #f16052de;
  color: #1c2631f3;
  cursor: pointer;
}

.date-panel {
  display: block;
  width: 100%;
  text-align: center;
}

.event-date {
  border: none;
  padding: 20px;
  font-size: 1.3em;
  margin-top: 30px;
  border-radius: 8px;
}

.date-label {
  text-align: center;
  font-size: 1.2em;
  padding-bottom: 5px;
}

.event-date:focus {
  outline: none;
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
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

.exit-button a {
  cursor: pointer;
}
</style>
