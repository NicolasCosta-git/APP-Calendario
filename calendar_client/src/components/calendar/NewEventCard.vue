<template>
  <form action="">
    <div class="new-event-card">
      <div class="event-card">
        <div class="card-header">
          <a href="" class="exit-button"
            ><img src="../../assets/x-mark.png" alt=""
          /></a>
          <h1>{{ dataDay }}/{{ dataMonth }}/{{ year }} - Novo Evento</h1>
        </div>
        <div class="event-details">
          <input
            type="text"
            name="eventName"
            placeholder="Nome do evento"
            class="event-name"
          />
          <div class="time-panel">
            <label for="time" class="time-label"> Começa às:</label>
            <input type="time" name="time" id="time" class="event-time" />
          </div>
          <div class="time-panel">
            <label for="time" class="time-label"> Termina às:</label>
            <input type="time" name="time" id="time" class="event-time" />
          </div>
          <textarea
            name="event-description"
            id=""
            cols="30"
            rows="10"
            placeholder="Descrição do evento"
            class="event-description"
          ></textarea>
          <button type="submit" class="event-button">
            Criar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      dataDay: null,
      dataMonth: null,
    };
  },
  props: {
    day: Number,
    year: Number,
    month: Number,
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
.new-event-card {
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
}

.event-card {
  margin: auto;
  width: 600px;
  border-radius: 13px;
  height: 700px;
  background-color: #e9e7e7;
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
