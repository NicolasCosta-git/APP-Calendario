<template>
  <div class="event-card">
    <div class="event-header">
      <h2>
        <span class="header-title">{{ title }}</span> - {{ dataDay }}/{{
          dataMonth
        }}/{{ year }}
      </h2>
    </div>
    <div class="event-body">
      <div class="starting-time">começa: {{ startingTime }}</div>
      <div class="ending-time">termina {{ endingTime }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="button-container">
      <button @click="seeEvent()" class="see-button">Ver</button>
      <button @click="deleteEvent()" class="delete-button">Deletar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataDay: null,
      dataMonth: null,
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    };
  },
  props: {
    id: Number,
    user_id: Number,
    day: Number,
    year: Number,
    month: Number,
    title: String,
    startingTime: String,
    endingTime: String,
    description: String,
  },
  methods: {
    seeEvent: function() {
      this.$emit("showEvent", {
        id: this.id,
        user_id: this.user_id,
        day: this.day,
        year: this.year,
        month: this.month,
        title: this.title,
        startingTime: this.startingTime,
        endingTime: this.endingTime,
        description: this.description,
      });
      return;
    },
    deleteEvent: async function() {
      this.error = undefined;
      await axios
        .delete(
          "http://localhost:3030/deleteevent/" + this.user_id + "/" + this.id,
          this.req
        )
        .then(() => {
          this.$emit("hidePopup");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    },
  },
  created() {
    this.day < 10 ? (this.dataDay = "0" + this.day) : (this.dataDay = this.day);
    this.month < 10
      ? (this.dataMonth = "0" + (this.month + 1))
      : (this.dataMonth = this.month + 1);
  },
};
</script>

<style scoped>
.event-card {
  border-radius: 8px;
  height: 200px;
  margin: 10px;
  background-color: #fafafae7;
  color: #2c3e50;
  min-width: 270px;
}

.event-card:hover {
  box-shadow: 0 0 3pt 2pt rgba(0, 0, 0, 0.05);
}

.event-header {
  background-color: #b2dfdb;
  line-height: 40px;
  border-radius: 8px 8px 0px 0px;
  padding-left: 20px;
}

.starting-time {
  display: inline-block;
  width: 50%;
  padding: 13px 0px 10px 10px;
  font-size: 1.3em;
  text-align: center;
}

.ending-time {
  display: inline-block;
  width: 50%;
  padding: 10px 0px 10px 10px;
  font-size: 1.3em;
  text-align: center;
}

.description {
  padding: 15px 30px 0px 30px;
  font-size: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.header-title {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  height: 30px;
}

.event-card button {
  border: none;
  display: block;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-container button {
  line-height: 30px;
  width: 40%;
  display: inline-block;
  border-radius: 7px;
  margin-top: 35px;
  font-size: 1.1em;
}

.delete-button {
  width: 40%;
  margin-left: 8px;
  background-color: #ff6152de;
  color: #1b0c0cc7;
}

.delete-button:hover {
  background-color: #ff61529d;
  color: #241010de;
  cursor: pointer;
}

.see-button {
  background-color: #5eb9ffd0;
  margin-right: 8px;
  color: #0d161de5;
}

.see-button:hover {
  background-color: #5eb9ff94;
  cursor: pointer;
}
</style>
