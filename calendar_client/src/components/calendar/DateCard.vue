<template>
  <div>
    <div
      :class="{
        'date-card today': empty !== true && today(),
        'date-card event': empty !== true && event == true,
        'date-card': empty !== true,
        'empty-card': empty == true,
      }"
    >
      <h1>
        {{ day }}
      </h1>
      <div v-if="fake !== true">
        <div v-if="event == true">
          <router-link
            :to="{ name: 'events' }"
            href="#"
            @click="events()"
            :class="{
              'new-event': empty !== undefined,
              'empty-card': empty == true,
            }"
          >
            <div class="event-notification">
              <img src="../../assets/mini-calendar.png" alt="" /> Ver eventos
            </div></router-link
          >
        </div>
        <div
          :class="{
            'new-event': empty !== undefined,
            'empty-card': empty == true,
          }"
        >
          <a @click="newPopup()" href="#">
            <img src="../../assets/plus.png" alt="" />
          </a>
          <a @click="newPopup()" href="#">Adicionar evento</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: Number,
    month: Number,
    year: Number,
    empty: Boolean,
    fake: Boolean,
    event: Boolean,
  },
  data() {
    return {
      eventDays: [],
    };
  },
  methods: {
    // mostra popup
    newPopup: function() {
      this.$emit("newPopup", { day: this.day });
    },
    // verifica se o dia é hoje
    today: function() {
      if (
        this.day == new Date().getDate() &&
        this.month == new Date().getMonth() &&
        this.year == new Date().getFullYear()
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.date-card {
  border-bottom: 1px solid #a3a3a3;
  box-sizing: border-box;
  overflow: hidden;
  min-height: 155px;
  transition: transform 100ms ease-in-out;
}

a {
  text-decoration: none;
}

.date-card h1 {
  padding: 20px 0px 0px 20px;
  font-size: 1.5em;
}

.date-card:hover {
  transform: scale(1.03);
  border-bottom: none;
  background-color: #eae8e8;
}

.new-event {
  padding: 12px 0 0 12px;
  display: none;
  justify-content: left;
  align-items: center;
  text-align: center;
}

.new-event a img {
  border: 1px solid;
  display: inline-block;
  border: 1px solid #b2dfdb3d;
  border-radius: 30px;
}

.new-event a {
  text-decoration: none;
  display: inline-block;
  padding-left: 10px;
  text-decoration: none;
  color: #2c3e50;
  font-size: 1.1em;
  font-weight: 300;
}

.event-notification {
  width: 100%;
  font-size: 1.1em;
  color: #2c3e50;
}
.event-notification img {
  position: relative;
  top: 3px;
}

.today {
  background-color: #b2dfdb36 !important;
}

.empty-card {
  display: none;
}
.date-card:hover .new-event {
  display: flex;
}

.event {
  background-color: #a3a3a362 !important;
}

@media only screen and (max-width: 1733px) {
  .new-event a {
    padding-left: 5px;
    padding-right: 5px;
  }
}

@media only screen and (max-width: 1200px) {
  .new-event a {
    padding-left: 0px;
    padding-right: 6px;
    font-size: 0.97em;
  }

  .event-notification {
    font-size: 0.97em;
  }
}
</style>
