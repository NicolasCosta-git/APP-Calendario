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
            <DateCard
              :day="day"
              :month="currentMonth"
              :year="currentYear"
              @newPopup="showPopup($event.day)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="fake !== true">
      <FloatMenu />
      <TopMenu />
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
import TopMenu from "./TopMenu.vue";

export default {
  data() {
    return {
      currentYear: null,
      currenthMonth: null,
      dayCount: null,
      allowPopup: false,
      popupData: {
        day: null,
        month: null,
        year: null,
      },
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
    TopMenu,
  },
  methods: {
    getFirstDay: function(year, month) {
      return new Date(year, month).getDay();
    },
    getDaysInMonth: function(year, month) {
      return 32 - new Date(year, month, 32).getDate();
    },
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
    },
    showPopup: function(day) {
      this.popupData.day = day;
      this.popupData.month = this.currenthMonth;
      this.popupData.year = this.currentYear;
      this.allowPopup = true;
    },
    checkToday() {
      if ((this.currenthMonth = new Date().getMonth())) {
        console.log(this.currenthMonth);
        return true;
      }
    },
  },
  created() {
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
