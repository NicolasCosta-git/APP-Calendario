<template>
  <div class="calendar-panel">
    <div>
      <SideMonthSelector @update="buildCalendar($event.year, $event.month)" />
    </div>
    <div>
      <TopMonthSelector @update="buildCalendar(undefined, $event.month)" />
    </div>
    <div>
      <TopYearSelector @update="buildCalendar($event.year, undefined)" />
    </div>
    <div>
      <DayIndicator />
    </div>
    <div class="new-event" v-if="allowPopup">
      <NewEventCard
        :day="popupData.day"
        :month="popupData.month"
        :year="popupData.year"
        @closePopup="hidePopup()"
      />
    </div>
    <div class="days-panel">
      <div v-for="day in dayCount" :key="day + Math.random()">
        <div v-if="day < 1">
          <DateCard :empty="true" />
        </div>
        <div v-else>
          <div v-if="fake == true">
            <DateCard
              :day="day"
              :fake="fake"
              :month="currentMonth"
              :year="currentYear"
              @newPopup="showPopup($event.day)"
            />
          </div>
          <div v-else>
            <div v-if="findEvent(day)">
              <DateCard
                :day="day"
                :month="currentMonth"
                :year="currentYear"
                :event="true"
                @newPopup="showPopup($event.day)"
              />
            </div>
            <div v-else>
              <DateCard
                :day="day"
                :month="currentMonth"
                :year="currentYear"
                :event="false"
                @newPopup="showPopup($event.day)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="fake !== true">
      <FloatMenu />
    </div>
  </div>
</template>

<script>
import DateCard from "./DateCard.vue";
import SideMonthSelector from "./SideMonthSelector.vue";
import DayIndicator from "./DayIndicator.vue";
import TopMonthSelector from "./TopMonthSelector.vue";
import TopYearSelector from "./TopYearSelector.vue";
import NewEventCard from "./NewEventCard.vue";
import FloatMenu from "./FloatMenu.vue";
import axios from "axios";

export default {
  data() {
    return {
      req: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      currentYear: null,
      currentMonth: null,
      schedule: [],
      dayCount: null,
      allowPopup: false,
      popupData: {
        day: null,
        month: null,
        year: null,
      },
      user_id: null,
      events: [],
    };
  },
  props: {
    fake: Boolean,
  },
  name: "CalendarPanel",
  components: {
    DateCard,
    SideMonthSelector,
    DayIndicator,
    TopMonthSelector,
    TopYearSelector,
    NewEventCard,
    FloatMenu,
  },
  methods: {
    // retorna o primeiro dia do mês
    getFirstDay: function(year, month) {
      return new Date(year, month).getDay();
    },
    // retorna quantos dias o mes tem
    getDaysInMonth: function(year, month) {
      return 32 - new Date(year, month, 32).getDate();
    },
    // monta o calendário
    buildCalendar: function(
      year = this.currentYear,
      month = this.currentMonth
    ) {
      let dayCount = Array();
      for (let i = 1; i <= this.getDaysInMonth(year, month); i++) {
        dayCount.push(i);
      }
      for (let i = 1; i < this.getFirstDay(year, month) + 1; i++) {
        dayCount.unshift(-1);
      }
      this.dayCount = dayCount;
      this.currentMonth = month;
      this.currentYear = year;
      this.schedule = [];
      this.checkEvent();
    },
    // mostra o card de criação de eventos
    showPopup: function(day) {
      this.popupData.day = day;
      this.popupData.month = this.currentMonth;
      this.popupData.year = this.currentYear;
      this.allowPopup = true;
    },
    // esconde o card de criação de eventos
    hidePopup: function() {
      this.allowPopup = false;
    },
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
    // retorna os eventos do usuáro
    getEvents: async function() {
      await axios
        .get("http://localhost:3030/getall/" + this.user_id, this.req)
        .then((res) => {
          this.events = res.data.data;
        })
        .catch((err) => {
          console.log(err.params.error);
        });
    },
    // verifica se existe evento na data atual
    checkEvent: function() {
      this.events.forEach((event) => {
        this.dayCount.forEach((day) => {
          if (
            event.day == day &&
            event.year == this.currentYear &&
            event.month == this.currentMonth
          ) {
            return this.schedule.push(day);
          }
        });
      });
    },
    // retorna true se o evento for no dia passado
    findEvent: function(day) {
      return !!this.schedule.find((event) => {
        return event == day;
      });
    },
  },
  async created() {
    if (!this.fake) {
      await this.getUser();
      await this.getEvents();
    }
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.buildCalendar(new Date().getFullYear(), new Date().getMonth());
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}

footer {
  clear: both;
}

body {
  height: 100%;
  background-color: #f5f5f6;
  min-width: 980px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.days-panel {
  grid-template-columns: repeat(auto-fill, minmax(14%, 14%));
  display: inline-grid;
  gap: 0px;
  width: 85%;
  float: right;
  justify-content: center;
  padding: 10px 0px 10px 0px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f5f5f6;
}

::-webkit-scrollbar-thumb {
  background: #a3a3a3;
  border-radius: 20px;
}

@media only screen and (max-width: 1733px) {
  .days-panel {
    width: 100%;
  }
}
</style>
